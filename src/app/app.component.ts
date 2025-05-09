import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatSidenav, MatSidenavContainer} from '@angular/material/sidenav';
import {SidebarComponent} from './public/components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSidenav, MatSidenavContainer, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FrontGWM';
}
