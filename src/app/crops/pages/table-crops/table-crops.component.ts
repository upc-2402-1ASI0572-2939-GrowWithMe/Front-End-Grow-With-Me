import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { CropsService } from '../../services/crops/crops.service';
import { Router } from '@angular/router';
import { RoleService } from '../../../iam/services/role.service';
import { Crop } from '../../models/crop.entity';
import { RegisterCropComponent } from '../../components/register-crop/register-crop.component';
import { EditCropsComponent } from '../edit-crops/edit-crops.component';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-table-crops',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    NgIf
  ],
  templateUrl: './table-crops.component.html',
  styleUrl: './table-crops.component.css'
})
export class TableCropsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'productName', 'category', 'area', 'options'];
  cropsData: Crop[] = [];

  selectedCrop: Crop | null = null;
  confirmDeleteVisible = false;
  successModalVisible = false;
  modalMessage: string = '';

  constructor(
    public cropsService: CropsService,
    public dialog: MatDialog,
    private router: Router,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.loadCropsData();
  }
  loadCropsData(): void {
    const currentRole = this.roleService.getCurrentRole();
    this.cropsService.getCrops().subscribe(data => {
      this.cropsData = currentRole === 'farmer'
        ? data.filter(crop => crop.profileId === 1)
        : data;
    });
  }

  onRegister(): void {
    const dialogRef = this.dialog.open(RegisterCropComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadCropsData();
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
      data: { crop: { ...crop } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadCropsData();
    });
  }
  OpenDeleteDialog(crop: Crop): void {
    this.confirmDelete(crop);
  }

  confirmDelete(crop: Crop): void {
    this.selectedCrop = crop;
    this.confirmDeleteVisible = true;
  }

  deleteCrop(): void {
    if (!this.selectedCrop) return;

    this.cropsService.deleteCrop(this.selectedCrop.id).subscribe({
      next: () => {
        this.modalMessage = 'Crop deleted successfully.';
        this.successModalVisible = true;
        this.confirmDeleteVisible = false;
        this.loadCropsData();
      },
      error: (err) => {
        this.modalMessage = 'Error deleting crop.';
        this.successModalVisible = true;
        this.confirmDeleteVisible = false;
        console.error(err);
      }
    });
  }

  closeModals(): void {
    this.confirmDeleteVisible = false;
    this.successModalVisible = false;
  }

  reloadPage(): void {
    location.reload();
  }

  protected readonly close = close;
}
