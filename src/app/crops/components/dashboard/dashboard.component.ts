import { Component, OnInit } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import { EnvironmentDataService } from '../../services/dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public chart!: Chart;
  private readonly deviceId = 2;

  constructor(private environmentService: EnvironmentDataService) {}

  ngOnInit(): void {
    this.loadSensorData();

    // Opcional: actualizar cada 60 segundos
    setInterval(() => this.loadSensorData(), 60000);
  }

  private loadSensorData(): void {
    this.environmentService.getSensorDataByDeviceId(this.deviceId).subscribe({
      next: (data) => {
        console.log('Temperatures:', data.temperatureList);
        console.log('Humidities:', data.humidityList);

        const labels = this.getTimeLabels(data.temperatureList.length, 10); // suponiendo cada 10 minutos

        const chartData = {
          labels,
          datasets: [
            {
              label: 'Humidity',
              data: data.humidityList,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              fill: true,
              tension: 0.1,
            },
            {
              label: 'Temperature',
              data: data.temperatureList,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              fill: true,
              tension: 0.1,
            }
          ]
        };

        this.updateChart(chartData);
      },
      error: (err) => {
        console.error('Error loading sensor data', err);
      }
    });
  }

  private updateChart(data: any): void {
    if (this.chart) {
      this.chart.data = data;
      this.chart.update();
    } else {
      this.chart = new Chart('chart', {
        type: 'line' as ChartType,
        data
      });
    }
  }

  // 🕒 Genera etiquetas de tiempo tipo HH:mm, suponiendo un intervalo (ej. 10 min)
  private getTimeLabels(count: number, intervalMinutes: number): string[] {
    const now = new Date();
    const labels: string[] = [];

    for (let i = count - 1; i >= 0; i--) {
      const date = new Date(now.getTime() - i * intervalMinutes * 60 * 1000);
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      labels.push(`${hours}:${minutes}`);
    }

    return labels;
  }
}
