import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface SensorData {
  current: number;
  min: number;
  max: number;
  history: number[];
}

@Component({
  selector: 'app-crop-monitoring',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './crop-monitoring.component.html',
  styleUrl: './crop-monitoring.component.css',
})
export class CropMonitoringComponent implements OnInit, AfterViewInit {
  exportData(exportData: any) {
    throw new Error('Method not implemented.');
  }
  @ViewChild('timeChart') timeChartRef!: ElementRef;

  temperature: SensorData = {
    current: 24.5,
    min: 19.2,
    max: 28.7,
    history: [],
  };

  humidity: SensorData = {
    current: 65.3,
    min: 42.8,
    max: 78.9,
    history: [],
  };

  timeLabels: string[] = [];
  chart: Chart | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const cropId = this.route.snapshot.paramMap.get('id');
    if (cropId === 'new') {
      console.log('Nuevo cultivo registrado');
    } else {
      console.log('Monitoreo del cultivo con ID:', cropId);
    }
    this.generateMockData();
  }

  ngAfterViewInit(): void {
    this.renderChart();
  }

  private generateMockData(): void {
    const now = new Date();
    for (let i = 0; i < 12; i++) {
      const timestamp = new Date(now.getTime() - (11 - i) * 60 * 60 * 1000);
      const hour = timestamp.getHours();
      const timeVariation = hour >= 6 && hour <= 18 ? 3 : 1;

      const temperature = this.temperature.current + (Math.random() * timeVariation * 2 - timeVariation);
      const humidity = this.humidity.current + (Math.random() * timeVariation * 5 - timeVariation * 2.5);

      this.timeLabels.push(`${hour}h`);
      this.temperature.history.push(parseFloat(temperature.toFixed(1)));
      this.humidity.history.push(parseFloat(humidity.toFixed(1)));
    }
  }

  private renderChart(): void {
    if (!this.timeChartRef) return;

    const ctx = this.timeChartRef.nativeElement.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.timeLabels,
        datasets: [
          {
            label: 'Temperatura (°C)',
            data: this.temperature.history,
            borderColor: '#2d6a4f',
            backgroundColor: 'rgba(45, 106, 79, 0.1)',
            tension: 0.4,
            fill: true,
          },
          {
            label: 'Humedad (%)',
            data: this.humidity.history,
            borderColor: '#4895ef',
            backgroundColor: 'rgba(72, 149, 239, 0.1)',
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: false,
            grid: {
              display: true,
              color: 'rgba(0, 0, 0, 0.05)',
            },
          },
          x: {
            display: false,
          },
        },
        plugins: {
          legend: {
            position: 'top',
            align: 'end',
          },
        },
      },
    });
  }
}