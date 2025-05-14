import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-device-card',
  imports: [],
  templateUrl: './device-card.component.html',
  styleUrl: './device-card.component.css'
})
export class DeviceCardComponent {
  @Input() device: any;
}
