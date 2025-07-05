import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatButton } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CropsService } from '../../services/crops/crops.service';

@Component({
  selector: 'app-edit-crops',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatInput,
    MatFormFieldModule,
    MatInputModule,
    MatSelect,
    MatOption,
    MatDialogActions,
    MatButton,
    FormsModule
  ],
  templateUrl: './edit-crops.component.html',
  styleUrl: './edit-crops.component.css'
})
export class EditCropsComponent {
  constructor(
    private cropsService: CropsService,
    public dialogRef: MatDialogRef<EditCropsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { crop: any }
  ) {}

  onConfirm(): void {
    const id = this.data.crop.id;
    this.cropsService.update(id, this.data.crop).subscribe({
      next: () => this.dialogRef.close(this.data.crop),
      error: () => this.dialogRef.close(null)
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
