import { Component } from '@angular/core';
import {MatSidenav, MatSidenavContainer} from '@angular/material/sidenav';
import {SidebarComponent} from '../../components/sidebar/sidebar.component';


@Component({
  selector: 'app-home',
  imports: [
    MatSidenavContainer,
    SidebarComponent,
    MatSidenav
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
