import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCalendar } from '@angular/material/datepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CropsService } from '../../services/crops/crops.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
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
  @Input() cropId!: string;
  @Output() dateSelected = new EventEmitter<Date>();

  selectedDate: Date | null = null;
  cropName: string = '';

  constructor(private cropsService: CropsService) {}

  ngOnInit(): void {
    if (this.cropId) {
      this.cropsService.getCrops().subscribe(crops => {
        const crop = crops.find(c => c.id === this.cropId);
        this.cropName = crop?.productName || 'Unknown Crop';
      });
    }
  }

  onDateSelected(date: Date) {
    this.selectedDate = date;
    this.dateSelected.emit(date); // emit to parent
  }
}
