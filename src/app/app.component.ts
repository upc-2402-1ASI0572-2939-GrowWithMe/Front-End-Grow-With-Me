import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MyDevicesPageComponent} from './devices/pages/my-devices-page/my-devices-page.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FrontGWM';
}
