import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-device-card',
  imports: [],
  templateUrl: './device-card.component.html',
  styleUrl: './device-card.component.css'
})

/**
 * Component to display a device's card with its details.
 * Role: for farmer view.
 */
export class DeviceCardComponent {
  @Input() device: any;
}
