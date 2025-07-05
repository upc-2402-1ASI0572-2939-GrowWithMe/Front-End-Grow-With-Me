import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableModule, MatColumnDef } from '@angular/material/table';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { Crop } from '../../models/crop.entity';
import { CropsService } from '../../services/crops/crops.service';
import { EditCropsComponent } from '../../components/edit-crops/edit-crops.component';
import { CreateCropsComponent } from '../../components/create-crops/create-crops.component';
import { DeleteCropsComponent } from '../../components/delete-crops/delete-crops.component';

@Component({
  selector: 'app-table-crops',
  standalone: true,
  imports: [
    MatTableModule,
    MatColumnDef,
    MatIconButton,
    MatIcon,
    MatButton,
    NgIf
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
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const role = localStorage.getItem('userRole');
    this.isConsultant = role === 'CONSULTANT_ROLE';
    this.title = role === 'FARMER_ROLE' ? 'My Crops' : 'Crops';

    const farmerIdParam = this.route.snapshot.paramMap.get('farmerId');
    const farmerId = farmerIdParam ? Number(farmerIdParam) : null;

    if (this.isConsultant && farmerId) {
      this.loadCropsData('farmer', farmerId);
    } else if (!this.isConsultant) {
      const userId = Number(localStorage.getItem('userId'));
      this.loadCropsData('farmer', userId);
    } else {
      this.loadCropsData('consultant');
    }
  }

  loadCropsData(role: string, farmerId?: number): void {
    const sortById = (data: Crop[]) => data.sort((a, b) => Number(a.id) - Number(b.id));

    if (role === 'farmer' && farmerId) {
      this.cropsService.getAllCropsByFarmerId(farmerId).subscribe(data => {
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
        const farmerIdParam = this.route.snapshot.paramMap.get('farmerId');
        const farmerId = farmerIdParam ? Number(farmerIdParam) : null;
        this.loadCropsData(
          this.isConsultant && farmerId ? 'farmer' : (this.isConsultant ? 'consultant' : 'farmer'),
          farmerId ?? undefined
        );

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
        const farmerIdParam = this.route.snapshot.paramMap.get('farmerId');
        const farmerId = farmerIdParam ? Number(farmerIdParam) : null;
        this.loadCropsData(
          this.isConsultant && farmerId ? 'farmer' : (this.isConsultant ? 'consultant' : 'farmer'),
          farmerId ?? undefined
        );

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
