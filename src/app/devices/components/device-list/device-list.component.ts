import { Component } from '@angular/core';
import {DeviceCardComponent} from '../device-card/device-card.component';

@Component({
  selector: 'app-device-list',
  imports: [
    DeviceCardComponent
  ],
  templateUrl: './device-list.component.html',
  styleUrl: './device-list.component.css'
})
export class DeviceListComponent implements OnInit {
  devices: Device[] = [];

  constructor(private deviceService: DeviceService) { }

  ngOnInit() {
    this.deviceService.getDevices().subscribe(data => {
      this.devices = data;
    });
  }
}
