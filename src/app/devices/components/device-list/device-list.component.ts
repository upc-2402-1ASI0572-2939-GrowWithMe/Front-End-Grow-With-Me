import {Component, OnInit} from '@angular/core';
import {DeviceCardComponent} from '../device-card/device-card.component';
import {DeviceService} from '../../services/device.service';
import {Device} from '../../models/device.entity';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-device-list',
  imports: [
    DeviceCardComponent,
    NgForOf
  ],
  templateUrl: './device-list.component.html',
  styleUrl: './device-list.component.css'
})

/**
 * Component to display a list of devices.
 * Role: for farmer view.
 */
export class DeviceListComponent implements OnInit {
  devices: Device[] = [];

  constructor(private deviceService: DeviceService) { }

  ngOnInit() {
    this.deviceService.getAll().subscribe(data => {
      this.devices = data;
    });
  }
}
