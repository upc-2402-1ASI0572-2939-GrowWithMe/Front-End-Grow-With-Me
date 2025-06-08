import { Component } from '@angular/core';

@Component({
  selector: 'app-monitoring-crops',
  templateUrl: './monitoring-crops.component.html',
  styleUrls: ['./monitoring-crops-component.css'],
})
export class MonitoringCropsComponent {
  title: string = 'Crop Monitoring';

  exportData(): void {
    console.log('Exporting data...');
  }
}