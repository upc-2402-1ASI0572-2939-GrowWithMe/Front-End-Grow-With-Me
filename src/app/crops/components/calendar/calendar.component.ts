import { Component, Input, Output, EventEmitter, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCalendar, MatCalendarCellClassFunction, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CropsService } from '../../services/crops/crops.service';
import { ActivitiesService } from '../../services/activities/activities.service';
import { Activity } from '../../models/activity.entity';

@Component({
  selector: 'app-calendar',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    MatCardModule,
    MatCalendar,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {
  @Input() cropId!: number;
  @Output() dateSelected = new EventEmitter<Date>();

  selectedDate: Date | null = null;
  cropName: string = '';
  activityDates: Date[] = [];
  today: Date = new Date();
  ready: boolean = false;

  constructor(
    private cropsService: CropsService,
    private activitiesService: ActivitiesService
  ) {}

  ngOnInit(): void {
    if (this.cropId) {
      this.cropsService.getById(this.cropId).subscribe(crop => {
        this.cropName = crop?.productName || 'Unknown Crop';
      });

      this.activitiesService.getAllCropActivitiesByCropId(this.cropId).subscribe(activities => {
        if (activities && activities.length > 0) {
          this.activityDates = activities
            .map(a => {
              const raw = a.activityDate;
              const parsed = new Date(raw + 'T00:00:00');
              return isNaN(parsed.getTime()) ? null : parsed;
            })
            .filter((d): d is Date => d !== null);

          console.log('Loaded activity dates:', this.activityDates);
        } else {
          this.activityDates = [];
        }
        this.ready = true;
      });
    }
  }

  onDateSelected(date: Date | null): void {
    if (!date) return;
    this.selectedDate = date;
    this.dateSelected.emit(date);
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (view === 'month') {
      return this.activityDates.some(activityDate =>
        cellDate.getFullYear() === activityDate.getFullYear() &&
        cellDate.getMonth() === activityDate.getMonth() &&
        cellDate.getDate() === activityDate.getDate()
      ) ? 'activity-date' : '';
    }
    return '';
  };
}
