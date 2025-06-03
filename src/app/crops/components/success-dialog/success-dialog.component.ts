import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegisterCropComponent} from '../register-crop/register-crop.component';

@Component({
  selector: 'app-success-dialog',
  imports: [
    MatIcon,
    MatDialogContent,
    MatButton,
    MatDialogActions,
    MatDialogClose
  ],
  templateUrl: './success-dialog.component.html',
  styleUrl: './success-dialog.component.css'
})
export class SuccessDialogComponent {
  cropForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RegisterCropComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
  ) {
    this.cropForm = this.fb.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      area: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(): void {
    if (this.cropForm.valid) {
      // Aquí iría tu lógica para guardar el cultivo
      // Simulamos que el registro fue exitoso:

      // 1. Cierra el modal de registro
      this.dialogRef.close(this.cropForm.value);

      // 2. Abre el modal de éxito
      this.dialog.open(SuccessDialogComponent, {
        width: '320px',
        disableClose: true
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
