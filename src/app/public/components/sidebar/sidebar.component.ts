import { Component, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { MatListItem, MatNavList } from '@angular/material/list';
import { Router, RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { NgIf, NgOptimizedImage } from '@angular/common';
import { Subscription } from 'rxjs';
import { RoleService } from '../../../iam/services/role.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatIcon,
    MatListItem,
    MatNavList,
    RouterLink,
    MatIconButton,
    NgIf,
    NgOptimizedImage
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  isSidebarOpen: boolean = true;
  role: string = 'farmer';
  private roleSub!: Subscription;
  showSidebar: boolean = true;

  @Output() sidebarToggled = new EventEmitter<boolean>();

  constructor(private roleService: RoleService, private router: Router) {}

  ngOnInit(): void {
    const hiddenRoutes = ['/', '/login', '/register', '/reset'];
    this.showSidebar = !hiddenRoutes.includes(this.router.url);

    this.router.events.subscribe(() => {
      this.showSidebar = !hiddenRoutes.includes(this.router.url);
    });

    this.roleSub = this.roleService.getRole$().subscribe((role: string) => {
      this.role = role;
    });
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.sidebarToggled.emit(this.isSidebarOpen);
  }

  ngOnDestroy(): void {
    this.roleSub.unsubscribe();
  }
}
