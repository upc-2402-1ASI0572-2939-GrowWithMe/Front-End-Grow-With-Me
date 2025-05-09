import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {CommonModule, NgIf} from '@angular/common';
import { CalendarComponent } from '../../components/calendar/calendar.component';
import { ActivityFormComponent } from '../../components/activity-form/activity-form.component';
import { ActivityDetailsComponent } from '../../components/activity-details/activity-details.component';
import {RoleService} from '../../../iam/services/role.service';

@Component({
  selector: 'app-calendar-page',
  standalone: true,
  imports: [
    CommonModule,
    CalendarComponent,
    ActivityFormComponent,
    ActivityDetailsComponent,
    NgIf
  ],
  templateUrl: './calendar-page.component.html',
  styleUrl: './calendar-page.component.css'
})
export class CalendarPageComponent implements OnInit {
  cropId: string = '';
  selectedDate: Date | null = null;
  role: string = 'farmer';

  constructor(
    private route: ActivatedRoute,
    private roleService: RoleService
  ) {
    this.cropId = this.route.snapshot.paramMap.get('id') || '';
  }

  ngOnInit(): void {
    this.roleService.getRole$().subscribe((role: string) => {
      this.role = role;
    });
  }

  handleDateChange(date: Date) {
    this.selectedDate = date;
  }

  closeForm() {
    this.selectedDate = null;
  }
}
