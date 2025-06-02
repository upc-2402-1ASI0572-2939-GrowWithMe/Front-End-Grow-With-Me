// src/app/components/sidebar/sidebar.component.ts
import {Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
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
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit, OnDestroy {
  isSidebarOpen: boolean = true;
  role: string = 'farmer';
  private roleSub!: Subscription;

  @ViewChild('sidebar') sidebarRef!: ElementRef;
  @ViewChild('sidebarIcon') iconRef!: ElementRef;

  constructor(
    private roleService: RoleService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.roleSub = this.roleService.getRole$().subscribe((role: string) => {
      this.role = role;
      this.updateMenuVisibility();
    });
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;

    if (this.isSidebarOpen) {
      this.renderer.removeClass(this.sidebarRef.nativeElement, 'closed');
      this.renderer.setProperty(this.iconRef.nativeElement, 'innerText', 'chevron_left');
    } else {
      this.renderer.addClass(this.sidebarRef.nativeElement, 'closed');
      this.renderer.setProperty(this.iconRef.nativeElement, 'innerText', 'chevron_right');
    }
  }

  updateMenuVisibility(): void {
    const items = this.sidebarRef.nativeElement.querySelectorAll('.nav-item');

    items.forEach((item: HTMLElement) => {
      const itemRole = item.getAttribute('data-role');
      if (itemRole === this.role) {
        this.renderer.setStyle(item, 'display', 'flex');
      } else {
        this.renderer.setStyle(item, 'display', 'none');
      }
    });
  }

  ngAfterViewInit(): void {
    this.updateMenuVisibility();
  }

  ngOnDestroy(): void {
    this.roleSub.unsubscribe();
  }
}