import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-activity-form',
  imports: [],
  templateUrl: './activity-form.component.html',
  styleUrl: './activity-form.component.css'
})
export class ActivityFormComponent {
  @Input() date!: Date;

}
