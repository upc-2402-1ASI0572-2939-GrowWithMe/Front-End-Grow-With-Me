import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import { ActivitiesService } from '../../services/activities/activities.service';
import { DatePipe, NgIf } from '@angular/common';
import {CropsService} from '../../services/crops/crops.service';
import {Crop} from '../../models/crop.entity';
import {Activity} from '../../models/activity.entity';


@Component({
  selector: 'app-activity-details',
  standalone: true,
  templateUrl: './activity-details.component.html',
  imports: [
    DatePipe,
    NgIf
  ],
  styleUrl: './activity-details.component.css'
})

/**
 * Component to display the details of an activity for a specific crop on a given date.
 * Role: for farmer view.
 */
export class ActivityDetailsComponent implements OnChanges {
  @Input() date!: Date;
  @Input() cropId!: number;
  @Output() close = new EventEmitter<void>();

  productName: string = '';
  time: string = '';
  description: string = '';
  noActivityModalVisible = false;
  hasActivity: boolean = false;

  constructor(
    private activitiesService: ActivitiesService,
    private cropsService: CropsService
  ) {}


  ngOnChanges(changes: SimpleChanges): void {
    if (this.date && this.cropId) {
      this.loadActivityDetails();
    }
  }
  loadActivityDetails(): void {
    const previousDate = new Date(this.date);
    previousDate.setDate(previousDate.getDate() - 1); // Resta un día

    this.cropsService.getAll().subscribe(crops => {
      const crop = crops.find(c => c.id === this.cropId);
      this.productName = crop?.productName || 'Unknown Crop';
    });

    this.activitiesService.getAllCropActivitiesByCropId(this.cropId).subscribe((activities: Activity[]) => {
      const match = activities.find((a: Activity) => {
        const actDate = new Date(a.activityDate);
        return actDate.toDateString() === previousDate.toDateString();
      });

      if (match) {
        const matchDate = new Date(match.activityDate);
        this.description = match.description;
        this.time = `${matchDate.getHours().toString().padStart(2, '0')}:${matchDate.getMinutes().toString().padStart(2, '0')}`;
        this.hasActivity = true;
      } else {
        this.description = '';
        this.time = '';
        this.hasActivity = false;
        this.noActivityModalVisible = true;
      }
    });
  }



  closeNoActivityModal(): void {
    this.noActivityModalVisible = false;
  }
}
