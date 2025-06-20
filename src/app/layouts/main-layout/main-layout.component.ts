import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {SidebarComponent} from '../../public/components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import {MyDevicesPageComponent} from '../../devices/pages/my-devices-page/my-devices-page.component';

import {MatSidenav, MatSidenavContainer} from '@angular/material/sidenav';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, MatSidenav, MatSidenavContainer, SidebarComponent, MatIcon, MatIconButton],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

}
