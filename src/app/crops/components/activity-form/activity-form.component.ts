import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CropsService } from '../../services/crops/crops.service';
import { ActivitiesService } from '../../services/activities/activities.service';
import { FormsModule } from '@angular/forms';
import { DatePipe, NgIf, formatDate } from '@angular/common';

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

  @Input() cropId!: number;
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
      this.cropsService.getAll().subscribe(crops => {
        const crop = crops.find(c => c.id === this.cropId);
        this.cropName = crop?.productName || 'Unknown Crop';
      });

      this.loadActivityIfExists();
    }
  }

  loadActivityIfExists(): void {
    this.activitiesService.getAllCropActivitiesByCropId(this.cropId).subscribe(activities => {
      if (!activities) {
        this.currentActivityId = null;
        this.description = '';
        this.time = '';
        return;
      }

      const truncateToDate = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

      const selectedDate = truncateToDate(this.date);

      const match = activities.find(a => {
        const [year, month, day] = a.activityDate.split('-').map(Number);
        const actDate = new Date(year, month - 1, day);

        const activityDate = truncateToDate(actDate);
        return activityDate.getTime() === selectedDate.getTime();
      });



      if (match) {
        this.currentActivityId = Number(match.id);
        this.description = match.description;

        const time = new Date(match.activityDate);
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

    const formattedDate = formatDate(datetime, 'yyyy-MM-dd', 'en-US');

    this.activitiesService.create({
      cropId: this.cropId,
      activityDate: formattedDate,
      description: this.description
    }).subscribe({
      next: () => {
        this.modalMessage = 'Activity created successfully';
        this.successModalVisible = true;
      },
      error: err => console.error('Error creating activity:', err)
    });
  }

  updateActivity(): void {
    if (this.currentActivityId == null) return;

    const datetime = new Date(this.date);
    const [hours, minutes] = this.time.split(':').map(Number);
    datetime.setHours(hours, minutes, 0, 0);

    const formattedDate = formatDate(datetime, 'yyyy-MM-dd', 'en-US');

    const updated = {
      cropId: this.cropId,
      activityDate: formattedDate,
      description: this.description
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

    this.activitiesService.delete(this.currentActivityId).subscribe({
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
