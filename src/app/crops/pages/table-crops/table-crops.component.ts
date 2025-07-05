import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableModule, MatColumnDef } from '@angular/material/table';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { CropsService } from '../../services/crops/crops.service';
import { MatDialog } from '@angular/material/dialog';
import { EditCropsComponent } from '../../components/edit-crops/edit-crops.component';
import { CreateCropsComponent } from '../../components/create-crops/create-crops.component';
import { DeleteCropsComponent } from '../../components/delete-crops/delete-crops.component';
import { Router } from '@angular/router';
import { Crop } from '../../models/crop.entity';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-table-crops',
  standalone: true,
  imports: [
    MatTableModule,
    MatColumnDef,
    MatIconButton,
    MatIcon,
    MatButton,
    NgIf,
  ],
  templateUrl: './table-crops.component.html',
  styleUrl: './table-crops.component.css'
})
export class TableCropsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'productName', 'category', 'area', 'options'];
  cropsData: Crop[] = [];
  title: string = 'Crops';
  isConsultant = false;
  deleteDialogOpen = false;

  constructor(
    public cropsService: CropsService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    const role = localStorage.getItem('userRole');
    console.log('User role from localStorage:', role);
    this.isConsultant = role === 'CONSULTANT_ROLE';
    this.title = role === 'FARMER_ROLE' ? 'My Crops' : 'Crops';
    this.loadCropsData(this.isConsultant ? 'consultant' : 'farmer');
  }

  loadCropsData(role: string): void {
    const userId = Number(localStorage.getItem('userId'));
    const sortById = (data: Crop[]) => data.sort((a, b) => Number(a.id) - Number(b.id));

    if (role === 'farmer') {
      this.cropsService.getAllCropsByFarmerId(userId).subscribe(data => {
        this.cropsData = sortById(data);
      });
    } else {
      this.cropsService.getAll().subscribe(data => {
        this.cropsData = sortById(data);
      });
    }
  }

  onRegister(): void {
    const dialogRef = this.dialog.open(CreateCropsComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCropsData(this.isConsultant ? 'consultant' : 'farmer');
      }
    });
  }

  goToCalendar(id: string): void {
    this.router.navigate([`/crops/${id}/calendar`]);
  }

  goToMonitoring(id: string): void {
    this.router.navigate([`/crops/${id}/monitoring`]);
  }

  openEditDialog(crop: Crop): void {
    const dialogRef = this.dialog.open(EditCropsComponent, {
      width: '400px',
      data: { crop: { ...crop } },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCropsData(this.isConsultant ? 'consultant' : 'farmer');
      }
    });
  }

  openDeleteDialog(cropId: number): void {
    if (this.deleteDialogOpen) return;
    this.deleteDialogOpen = true;

    const dialogRef = this.dialog.open(DeleteCropsComponent, {
      width: '350px',
      data: { cropId }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.deleteDialogOpen = false;

      if (result) {
        this.cropsData = this.cropsData.filter(c => c.id !== cropId);
      }
    });
  }
}
