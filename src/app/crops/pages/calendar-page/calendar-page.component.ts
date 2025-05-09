import { Component } from '@angular/core';
import {CalendarComponent} from '../../components/calendar/calendar.component';
import {ActivatedRoute} from '@angular/router';
import {ActivityFormComponent} from '../../components/activity-form/activity-form.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-calendar-page',
  standalone: true,
  imports: [
    CalendarComponent,
    ActivityFormComponent,
    NgIf
  ],
  templateUrl: './calendar-page.component.html',
  styleUrl: './calendar-page.component.css'
})
export class CalendarPageComponent {
  cropId: string = '';
  selectedDate: Date | null = null;

  constructor(private route: ActivatedRoute) {
    this.cropId = this.route.snapshot.paramMap.get('id') || '';
  }

  handleDateChange(date: Date) {
    this.selectedDate = date;
  }
}
