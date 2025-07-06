import { Component } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { CropsService } from '../../services/crops/crops.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatFormField, MatLabel, MatOption, MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-create-crops',
  standalone: true,
  imports: [
    FormsModule, NgIf,
    MatOption, MatDialogActions, MatLabel, MatFormField,
    MatDialogContent, MatSelect, MatInput, MatButton, MatDialogTitle
  ],
  templateUrl: './create-crops.component.html',
  styleUrl: './create-crops.component.css'
})
export class CreateCropsComponent {
  productName: string = '';
  code: string = '';
  category: string = '';
  area: number = 0;
  location: string = '';
  successModalVisible: boolean = false;
  modalMessage: string = '';

  constructor(
    private cropsService: CropsService,
    private dialogRef: MatDialogRef<CreateCropsComponent>
  ) {}

  createCrop(): void {
    const farmerId = Number(localStorage.getItem('userId'));

    this.cropsService.getAll().subscribe({
      next: crops => {
        const maxId = crops?.length > 0 ? Math.max(...crops.map(c => +c.id)) : 0;
        this.sendCreateRequest(maxId + 1, farmerId);
      },
      error: () => {
        // Si ocurre error (ej. lista vacía o backend sin datos), empezamos en ID 1
        this.sendCreateRequest(1, farmerId);
      }
    });
  }

  private sendCreateRequest(newId: number, farmerId: number): void {
    const newCrop = {
      id: newId,
      farmerId: farmerId,
      productName: this.productName,
      code: this.code,
      category: this.category,
      status: 'EMPTY',
      area: this.area,
      location: this.location
    };

    this.cropsService.create(newCrop).subscribe({
      next: () => {
        this.modalMessage = 'Crop created successfully';
        this.successModalVisible = true;
        setTimeout(() => this.dialogRef.close(true), 1200);
      },
      error: () => {
        this.modalMessage = 'Error while creating crop';
        this.successModalVisible = true;
      }
    });
  }

  onlyAllowNumbers(event: KeyboardEvent): void {
    const allowed = /[0-9]/;
    if (!allowed.test(event.key)) {
      event.preventDefault();
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
