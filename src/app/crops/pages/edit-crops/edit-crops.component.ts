import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatFormField, MatInput, MatInputModule} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-edit-crops',
  imports: [
    MatDialogContent,
    MatFormField,
    MatSelect,
    MatOption,
    MatDialogActions,
    FormsModule,
    MatButton,
    MatInput,
    MatDialogTitle,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './edit-crops.component.html',
  styleUrl: './edit-crops.component.css'
})
export class EditCropsComponent {
  constructor(
    public dialogRef: MatDialogRef<EditCropsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { crop: any }
  ) {}

  onConfirm(): void {
    this.dialogRef.close(this.data.crop);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
