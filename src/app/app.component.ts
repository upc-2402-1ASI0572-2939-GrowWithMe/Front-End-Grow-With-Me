import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import {MatSidenav, MatSidenavContainer} from '@angular/material/sidenav';
import {SidebarComponent} from './public/components/sidebar/sidebar.component';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common'; // <-- ESTA ES LA CLAVE


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSidenav, MatSidenavContainer, SidebarComponent, MatIcon, MatIconButton,MatMenuModule,MatIconModule,MatButtonModule, MatListModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FrontGWM';
   notifications = [
    'Alert: High temperature in Zone 1',
    'Humidity level dropped in Zone 3',
    'Fertilizer low in tank A',
    'New report generated',
    'Maintenance task scheduled',
    'Consultant message: Please check your sensors',
    'Weather warning in your area',
    'New tips available for soil treatment'
  ];
}
