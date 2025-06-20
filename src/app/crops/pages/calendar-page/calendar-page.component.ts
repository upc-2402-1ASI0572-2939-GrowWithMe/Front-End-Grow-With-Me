import {Component, Input, OnInit} from '@angular/core';
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

/**
 * Component to display the calendar page with a calendar and activity management.
 * Role: for farmer view.
 */
export class CalendarPageComponent implements OnInit {
  @Input() cropId!: number;
  selectedDate: Date | null = null;
  role: string = 'farmer';

  constructor(private route: ActivatedRoute, private roleService: RoleService) {
    //this.cropId = this.route.snapshot.paramMap.get('cropId') || 0;
  }

  ngOnInit(): void {
    this.roleService.getRole$().subscribe((role: string) => {
      this.role = role;
    });

    const id = this.route.snapshot.paramMap.get('cropId');
    if (id) {
      this.cropId = +id;
    } else {
      console.error('Crop ID not found in route parameters');
      this.cropId = 0;
    }
  }

  handleDateChange(date: Date) {
    this.selectedDate = date;
  }

  closeForm() {
    this.selectedDate = null;
  }
}
