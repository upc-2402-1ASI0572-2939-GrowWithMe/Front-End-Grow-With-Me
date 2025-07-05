import { Component, OnInit } from '@angular/core';
import { FarmersService } from '../../services/farmers/farmers.service';
import { ConsultantsService } from '../../services/consultants/consultants.service';
import { Farmer } from '../../models/farmer.entity';
import { Consultant } from '../../models/consultant.entity';
import {NgIf, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  imports: [NgIf],
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isFarmer = false;
  user: Farmer | Consultant | null = null;

  constructor(
    private farmersService: FarmersService,
    private consultantsService: ConsultantsService
  ) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('userRole');
    if (!userId || !userRole) return;

    const id = Number(userId);

    if (userRole === 'FARMER_ROLE') {
      this.isFarmer = true;
      this.farmersService.getAll().subscribe(farmers => {
        this.user = farmers.find(f => f.id === id) || null;
      });
    } else if (userRole === 'CONSULTANT_ROLE') {
      this.isFarmer = false;
      this.consultantsService.getAll().subscribe(consultants => {
        this.user = consultants.find(c => c.id === id) || null;
      });
    }
  }
}
