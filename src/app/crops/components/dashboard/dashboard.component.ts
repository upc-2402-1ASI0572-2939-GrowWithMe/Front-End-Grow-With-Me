import { Component, OnInit } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public chart!: Chart;

  ngOnInit(): void {
    const labels = this.getLast12Hours();

    const data = {
      labels,
      datasets: [
        {
          label: 'Humidity',
          data: this.generateRandomValues(12, 55, 80),
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          fill: true,
          tension: 0.1,
        },
        {
          label: 'Temperature',
          data: this.generateRandomValues(12, 20, 30),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          fill: true,
          tension: 0.1,
        }
      ]
    };

    this.chart = new Chart('chart', {
      type: 'line' as ChartType,
      data
    });
  }

  // Genera las etiquetas de las últimas 12 horas (HH:00)
  getLast12Hours(): string[] {
    const now = new Date();
    const labels: string[] = [];

    for (let i = 11; i >= 0; i--) {
      const hour = new Date(now.getTime() - i * 60 * 60 * 1000).getHours();
      labels.push(`${hour.toString().padStart(2, '0')}:00`);
    }

    return labels;
  }

  // Simula valores aleatorios para cada hora
  generateRandomValues(count: number, min: number, max: number): number[] {
    return Array.from({ length: count }, () =>
      parseFloat((Math.random() * (max - min) + min).toFixed(1))
    );
  }
}
