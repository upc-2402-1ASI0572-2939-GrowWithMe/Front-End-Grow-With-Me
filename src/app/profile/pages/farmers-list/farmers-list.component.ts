import { CommonModule } from '@angular/common'; // <- Import necesario para standalone
import { Component, OnInit } from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Farmer } from '../../models/farmer.entity';
import { FarmersService } from '../../services/farmers/farmers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-farmers-list',
  standalone: true, // <- Asegúrate de agregar esto
  imports: [
    CommonModule,     // <- Necesario para *ngIf, *ngFor, etc.
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatIcon,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatIconButton
  ],
  templateUrl: './farmers-list.component.html',
  styleUrl: './farmers-list.component.css'
})
export class FarmersListComponent implements OnInit {
  displayedColumns = ['id', 'name', 'email', 'options'];
  farmersData: Farmer[] = [];

  constructor(
    private farmersService: FarmersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFarmersData();
  }

  loadFarmersData(): void {
    this.farmersService.getAll().subscribe((data: Farmer[]) => {
      this.farmersData = data;
    });
  }

  showCrops(farmerId: number): void {
    console.log(`Show crops for the farmer ID: ${farmerId}`);
  }

  showNotifications(farmerId: number): void {
    console.log(`Show notifications for farmer ID: ${farmerId}`);
    this.router.navigate([`/notifications`]);
  }
}
