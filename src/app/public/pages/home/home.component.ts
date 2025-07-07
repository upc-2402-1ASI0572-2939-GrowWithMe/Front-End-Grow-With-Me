// src/app/pages/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../../iam/services/role.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  role: 'farmer' | 'consultant' = 'farmer';
  private roleSub!: Subscription;

  constructor(private roleService: RoleService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('authToken');
    console.log('Auth Token:', token);
  }
}
