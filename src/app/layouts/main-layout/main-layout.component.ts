import { Component, OnInit } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import { SidebarComponent } from '../../public/components/sidebar/sidebar.component';
import { NgIf } from '@angular/common';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, NgIf, MatIconButton, MatIcon, RouterLink],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  isLoggedIn = false;
  isSidebarOpen = true;

  get mainContentClass(): string {
    return this.isSidebarOpen ? 'main-content-area' : 'main-content-area collapsed';
  }

  ngOnInit(): void {
    this.isLoggedIn = !!localStorage.getItem('authToken');
  }

  onSidebarToggle(open: boolean): void {
    this.isSidebarOpen = open;
  }
}
