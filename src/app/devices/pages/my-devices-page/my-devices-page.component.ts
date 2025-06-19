import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {DeviceListComponent} from '../../components/device-list/device-list.component';
import {AddDeviceFormComponent} from '../../components/add-device-form/add-device-form.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-my-devices-page',
  imports: [
    DeviceListComponent,
    AddDeviceFormComponent,
    NgIf
  ],
  templateUrl: './my-devices-page.component.html',
  styleUrl: './my-devices-page.component.css'
})
export class MyDevicesPageComponent {
  @Input() farmerId!: number;
  showForm = false;

  constructor(private router: Router) {}

  openForm() {
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
  }

  handleSubmit(data: any) {
    console.log('Form submitted', data);
  }

}
