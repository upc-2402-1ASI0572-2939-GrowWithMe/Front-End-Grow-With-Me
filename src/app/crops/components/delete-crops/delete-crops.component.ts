import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { CropsService } from '../../services/crops/crops.service';

@Component({
  selector: 'app-delete-crops',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton
  ],
  templateUrl: './delete-crops.component.html',
  styleUrl: './delete-crops.component.css'
})
export class DeleteCropsComponent {
  isDeleting = false;
  deleteAttempts = 0;

  constructor(
    private cropsService: CropsService,
    public dialogRef: MatDialogRef<DeleteCropsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { cropId: number }
  ) {}

  onDelete(): void {
    this.deleteAttempts++;
    if (this.isDeleting) return;
    this.isDeleting = true;

    this.cropsService.delete(this.data.cropId).subscribe({
      next: () => this.dialogRef.close(true),
      error: () => this.dialogRef.close(false)
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
