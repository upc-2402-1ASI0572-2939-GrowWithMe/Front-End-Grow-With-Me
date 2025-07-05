import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import {NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';
@Component({
  selector: 'app-monitoring-crops',
  templateUrl: './monitoring-crops.component.html',
  styleUrls: ['./monitoring-crops.component.css'],
  standalone: true,
  imports: [MatIconModule, DashboardComponent, NgIf, MatButton], // Import MatIconModule here
})

/**
 * Component to display the crop monitoring dashboard.
 * Role: for farmer view.
 */
export class MonitoringCropsComponent {
  title: string = 'Crop Monitoring';
  exportMessage: string = ''; // Variable to store the export status message

  exportData(): void {
    try {
      // Data for the dashboard
      const data = [
        { Date: '2025-05-15', Temperature: '24.5°C', Humidity: '65%' },
        { Date: '2025-05-16', Temperature: '25.0°C', Humidity: '60%' },
        { Date: '2025-05-17', Temperature: '23.8°C', Humidity: '70%' },
      ];

      // Convert data to CSV format
      let csvContent = 'data:text/csv;charset=utf-8,';
      csvContent += 'Date,Temperature,Humidity\n'; // Header row
      data.forEach((row) => {
        csvContent += `${row.Date},${row.Temperature},${row.Humidity}\n`;
      });

      // Create a downloadable link
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', 'Dashboard_Data.csv');
      document.body.appendChild(link);

      // Trigger the download
      link.click();
      document.body.removeChild(link);

      this.exportMessage = 'Operation successful: Data exported!';
    } catch (error) {
      this.exportMessage = 'Operation failed: Unable to export data.';
    }

    // Clear the message after 3 seconds
    setTimeout(() => {
      this.exportMessage = '';
    }, 3000);
  }
}
