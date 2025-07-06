import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { EnvironmentDataService } from '../../services/dashboard/dashboard.service';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { Crop } from '../../models/crop.entity';
import {CropsService} from '../../services/crops/crops.service';

@Component({
  selector: 'app-monitoring-crops',
  templateUrl: './monitoring-crops.component.html',
  styleUrls: ['./monitoring-crops.component.css'],
  standalone: true,
  imports: [MatIconModule, DashboardComponent, NgIf, MatButton]
})
export class MonitoringCropsComponent implements OnInit {
  title: string = 'Crop Monitoring';
  exportMessage: string = '';
  cropId!: number;
  cropName: string = '...';
  temperatureList: number[] = [];
  humidityList: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private environmentService: EnvironmentDataService,
    private cropService: CropsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('cropId');
      if (id) {
        this.cropId = +id;
        this.loadSensorData();
        this.loadCropName();
      }
    });
  }

  loadCropName(): void {
    this.cropService.getById(this.cropId).subscribe({
      next: (crop: Crop) => {
        this.cropName = crop.productName || 'Unnamed Crop';
      },
      error: () => {
        this.cropName = 'Unknown Crop';
      }
    });
  }

  loadSensorData(): void {
    this.environmentService.getSensorDataByDeviceId(this.cropId).subscribe({
      next: (data) => {
        this.temperatureList = data.temperatureList;
        this.humidityList = data.humidityList;
      },
      error: (err) => {
        console.error('Error loading sensor data', err);
      }
    });
  }

  exportData(): void {
    try {
      const now = new Date();
      const data = this.temperatureList.map((temp, index) => {
        const humidity = this.humidityList[index] ?? '';
        const date = new Date(now.getTime() - (this.temperatureList.length - 1 - index) * 10 * 60 * 1000);
        const formattedDate = `${date.toLocaleDateString()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
        return { Date: formattedDate, Temperature: `${temp}°C`, Humidity: `${humidity}%` };
      });

      let csvContent = 'data:text/csv;charset=utf-8,';
      csvContent += 'Date,Temperature,Humidity\n';
      data.forEach((row) => {
        csvContent += `${row.Date},${row.Temperature},${row.Humidity}\n`;
      });

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', 'Dashboard_Data.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      this.exportMessage = 'Operation successful: Data exported!';
    } catch (error) {
      this.exportMessage = 'Operation failed: Unable to export data.';
    }

    setTimeout(() => {
      this.exportMessage = '';
    }, 3000);
  }
}
