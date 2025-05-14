import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MyDevicesPageComponent} from './devices/pages/my-devices-page/my-devices-page.component';

import {MatSidenav, MatSidenavContainer} from '@angular/material/sidenav';
import {SidebarComponent} from './public/components/sidebar/sidebar.component';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSidenav, MatSidenavContainer, SidebarComponent, MatIcon, MatIconButton],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FrontGWM';
}
