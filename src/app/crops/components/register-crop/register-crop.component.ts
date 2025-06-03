import { Component, Inject } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogTitle, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatOption, MatSelect } from '@angular/material/select';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgIf } from '@angular/common';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component'; // Asegúrate de importar tu componente de éxito

@Component({
  selector: 'app-register-crop',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatFormFieldModule,
    MatOption,
    MatInput,
    ReactiveFormsModule,
    MatSelect,
    MatDialogActions,
    MatButton,
  ],
  templateUrl: './register-crop.component.html',
  styleUrl: './register-crop.component.css'
})
export class RegisterCropComponent {
  cropForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RegisterCropComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog // Inyecta MatDialog
  ) {
    this.cropForm = this.fb.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      area: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(): void {
    if (this.cropForm.valid) {
      // 1. Cierra el modal actual
      this.dialogRef.close(this.cropForm.value);

      // 2. Abre el modal de éxito
      this.openSuccessDialog();
    }
  }

  openSuccessDialog(): void {
    this.dialog.open(SuccessDialogComponent, {
      width: '350px',
      disableClose: true, // Evita que se cierre haciendo clic fuera
      panelClass: 'success-dialog-container' // Clase opcional para estilos adicionales
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
