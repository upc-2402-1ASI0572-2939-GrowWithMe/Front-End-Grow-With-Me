import { Component, OnInit } from '@angular/core';
import { DeviceCardComponent } from '../device-card/device-card.component';
import { DeviceService } from '../../services/device.service';
import { CropsService } from '../../../crops/services/crops/crops.service';
import { Device } from '../../models/device.entity';
import { Crop } from '../../../crops/models/crop.entity';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-device-list',
  standalone: true,
  imports: [DeviceCardComponent, NgForOf],
  templateUrl: './device-list.component.html',
  styleUrl: './device-list.component.css'
})
export class DeviceListComponent implements OnInit {
  devices: Device[] = [];
  crops: Crop[] = [];

  constructor(
    private deviceService: DeviceService,
    private cropsService: CropsService
  ) {}

  ngOnInit() {
    const farmerId = Number(localStorage.getItem('userId'));
    this.cropsService.getAllCropsByFarmerId(farmerId).subscribe(crops => {
      this.crops = crops;

      this.deviceService.getAllDevicesByFarmerId().subscribe(devices => {
        this.devices = devices;
      });
    });
  }

  getCropName(cropId: number): string {
    return this.crops.find(c => c.id === cropId)?.productName ?? 'Unknown';
  }

  loadDevices() {
    this.deviceService.getAllDevicesByFarmerId().subscribe(data => {
      this.devices = data;
    });
  }
}
