import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Device} from '../../models/device.entity';
import {FormsModule, NgForm} from '@angular/forms';
import {DeviceService} from '../../services/device.service';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-add-device-form',
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './add-device-form.component.html',
  styleUrl: './add-device-form.component.css'
})
export class AddDeviceFormComponent {
  @Input() cropId!: number;
  @Input() farmerId!: number;
  id: string = '';
  name: string = '';
  token: string = '';
  deviceTypes: string[] = ['Humidity Sensor', 'Temperature Sensor'];
  deviceType: string = '';
  status: string = '';
  submitted: boolean = false;
  successModalVisible: boolean = false;

  @Output() submitAddDevice = new EventEmitter<Device>();
  @Output() closeModal = new EventEmitter<void>();

  constructor(private deviceService: DeviceService) { }

  handleSuccessAccept() {
    this.successModalVisible = false;
    this.closeModal.emit();
  }

  submitForm(form: NgForm) {
    this.submitted = true;
    if (form.invalid || this.token === null) return;

    this.deviceService.getAllDevicesByFarmerId(this.farmerId).subscribe(device => {
      const deviceExists = device.some((d: Device) => d === this.token);
      if (deviceExists) {
        alert('Device with this token already exists');
        return;
      }

      const newDevice: Device = {
        id: 0,
        name: this.name,
        token: this.token,
        deviceType: this.deviceType,
        status: 'CONNECTED'
      };

      this.deviceService.create(newDevice).subscribe(() => {
        this.successModalVisible = true;
        form.reset();
        this.submitted = false;
      });
    })
  }
}
