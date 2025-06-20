// src/app/components/sidebar/sidebar.component.ts
import {Component, OnDestroy, OnInit} from '@angular/core';
import { MatListItem, MatNavList } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatSidenav, MatSidenavContainer } from '@angular/material/sidenav';
import { MatIconButton } from '@angular/material/button';
import {NgIf, NgOptimizedImage} from '@angular/common';
import { Subscription } from 'rxjs';
import {RoleService} from '../../../iam/services/role.service';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatIcon,
    MatListItem,
    MatNavList,
    RouterLink,
    MatSidenavContainer,
    MatIconButton,
    MatSidenav,
    NgIf,
    NgOptimizedImage,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit, OnDestroy {
  isSidebarOpen: boolean = true;
  role: string = 'farmer';
  private roleSub!: Subscription;

  constructor(private roleService: RoleService) {}

  ngOnInit(): void {
    this.roleSub = this.roleService.getRole$().subscribe((role: string) => {
      this.role = role;
    });
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  ngOnDestroy(): void {
    this.roleSub.unsubscribe();
  }
}
