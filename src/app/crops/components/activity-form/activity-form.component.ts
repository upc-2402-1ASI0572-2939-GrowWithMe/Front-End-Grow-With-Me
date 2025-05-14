import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CropsService } from '../../services/crops/crops.service';
import { ActivitiesService } from '../../services/activities/activities.service';
import { FormsModule } from '@angular/forms';
import { DatePipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-activity-form',
  standalone: true,
  imports: [
    FormsModule,
    DatePipe,
    NgIf
  ],
  templateUrl: './activity-form.component.html',
  styleUrl: './activity-form.component.css'
})
export class ActivityFormComponent implements OnInit {
  private _date!: Date;
  @Input() set date(value: Date) {
    this._date = value;
    if (this.cropId) {
      this.loadActivityIfExists();
    }
  }
  get date(): Date {
    return this._date;
  }

  @Input() cropId!: string;
  @Output() closeForm = new EventEmitter<void>();

  cropName: string = '';
  time: string = '';
  description: string = '';
  successModalVisible = false;
  confirmDeleteVisible = false;
  currentActivityId: number | null = null;
  modalMessage: string = '';

  constructor(
    private cropsService: CropsService,
    private activitiesService: ActivitiesService
  ) {}

  ngOnInit(): void {
    if (this.cropId) {
      this.cropsService.getCrops().subscribe(crops => {
        const crop = crops.find(c => c.id === this.cropId);
        this.cropName = crop?.productName || 'Unknown Crop';
      });

      this.loadActivityIfExists();
    }
  }

  loadActivityIfExists(): void {
    this.activitiesService.getByCropId(this.cropId).subscribe(activities => {
      const match = activities.find(a => {
        const actDate = new Date(a.date);
        return actDate.toDateString() === this.date.toDateString();
      });

      if (match) {
        this.currentActivityId = Number(match.id);
        this.description = match.description;

        const time = new Date(match.date);
        this.time = `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`;
      } else {
        this.currentActivityId = null;
        this.description = '';
        this.time = '';
      }
    });
  }

  submitForm(): void {
    const datetime = new Date(this.date);
    const [hours, minutes] = this.time.split(':').map(Number);
    datetime.setHours(hours, minutes, 0, 0);

    this.activitiesService.getAll().subscribe(allActivities => {
      const maxId = allActivities.length > 0 ? Math.max(...allActivities.map(a => +a.id)) : 0;
      const nextId = maxId + 1;

      const newActivity = {
        id: nextId,
        cropId: this.cropId,
        description: this.description,
        date: datetime.toISOString()
      };

      this.activitiesService.create(newActivity).subscribe({
        next: () => {
          this.modalMessage = 'Activity created successfully';
          this.successModalVisible = true;
        },
        error: err => console.error('Error creating activity:', err)
      });
    });
  }

  updateActivity(): void {
    if (this.currentActivityId == null) return;

    const datetime = new Date(this.date);
    const [hours, minutes] = this.time.split(':').map(Number);
    datetime.setHours(hours, minutes, 0, 0);

    const updated = {
      id: this.currentActivityId,
      cropId: this.cropId,
      description: this.description,
      date: datetime.toISOString()
    };

    this.activitiesService.update(this.currentActivityId.toString(), updated).subscribe({
      next: () => {
        this.modalMessage = 'Activity updated successfully';
        this.successModalVisible = true;
      },
      error: err => console.error('Update error', err)
    });
  }

  confirmDelete(): void {
    this.confirmDeleteVisible = true;
  }

  deleteActivity(): void {
    if (this.currentActivityId == null) return;

    this.activitiesService.delete(this.currentActivityId.toString()).subscribe({
      next: () => {
        this.modalMessage = 'Activity deleted successfully';
        this.successModalVisible = true;
        this.confirmDeleteVisible = false;
      },
      error: err => console.error('Delete error', err)
    });
  }

  reloadPage(): void {
    location.reload();
  }
}
