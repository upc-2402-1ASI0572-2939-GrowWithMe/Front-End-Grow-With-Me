import { Component, Input } from '@angular/core';
import { Device } from '../../models/device.entity';
import { DeviceService } from '../../services/device.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-device-card',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './device-card.component.html',
  styleUrl: './device-card.component.css'
})
export class DeviceCardComponent {
  @Input() device!: Device;
  @Input() cropName!: string;

  constructor(private deviceService: DeviceService) {}

  activateDevice() {
    this.deviceService.activateDevice(this.device.id).subscribe({
      next: () => this.device.isActive = true,
      error: err => console.error('Error activating device:', err)
    });
  }
}
