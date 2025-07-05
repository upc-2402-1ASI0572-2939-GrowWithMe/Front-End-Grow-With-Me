import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../public/components/sidebar/sidebar.component';
import { NgIf } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

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

  constructor(private router: Router) {}

  get mainContentClass(): string {
    return this.isSidebarOpen ? 'main-content-area' : 'main-content-area collapsed';
  }

  tokenExists(): boolean {
    return !!localStorage.getItem('authToken');
  }

  ngOnInit(): void {
    this.isLoggedIn = !!localStorage.getItem('authToken');
  }

  onSidebarToggle(open: boolean): void {
    this.isSidebarOpen = open;
  }

  goToNotifications(): void {
    const role = localStorage.getItem('userRole');
    if (role === 'FARMER_ROLE') {
      this.router.navigate(['/notifications']);
    } else if (role === 'CONSULTANT_ROLE') {
      this.router.navigate(['/farmers/history']);
    }
  }
}
