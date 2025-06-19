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
    this.cropsService.getAll().subscribe(crops => {
      const crop = crops.find(c => c.id === this.cropId);
      this.productName = crop?.productName || 'Unknown Crop';
    });

    this.activitiesService.getAllCropActivitiesByCropId(this.cropId).subscribe((activities: Activity[]) => {
      const match = activities.find((a: Activity) => {
        const actDate = new Date(a.date);
        return actDate.toDateString() === this.date.toDateString();
      });

      if (match) {
        const matchDate = new Date(match.date);
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
