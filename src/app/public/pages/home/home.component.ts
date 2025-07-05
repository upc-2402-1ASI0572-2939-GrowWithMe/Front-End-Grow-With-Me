// src/app/pages/home/home.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RoleService } from '../../../iam/services/role.service';
import { MatSidenavContainer, MatSidenav } from '@angular/material/sidenav';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { Subscription } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  role: 'farmer' | 'consultant' = 'farmer';
  private roleSub!: Subscription;

  constructor(private roleService: RoleService) {}

}
