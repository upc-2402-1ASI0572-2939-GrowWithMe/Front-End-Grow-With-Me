import { Component } from '@angular/core';
import {MatListItem, MatNavList} from '@angular/material/list';
import {RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {MatSidenav, MatSidenavContainer} from '@angular/material/sidenav';
import {MatIconButton} from '@angular/material/button';
import {NgIf, } from '@angular/common';
@Component({
  selector: 'app-sidebar',
  imports: [
    MatIcon,
    MatListItem,
    MatNavList,
    RouterLink,
    MatSidenavContainer,
    MatIconButton,
    MatSidenav,
    NgIf,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  isSidebarOpen: boolean = true;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
