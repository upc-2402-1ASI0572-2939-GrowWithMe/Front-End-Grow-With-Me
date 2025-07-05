import { Component, Input } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { Consultant } from '../../../profile/models/consultant.entity';

@Component({
  selector: 'app-consultant-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './consultant-card.component.html',
  styleUrl: './consultant-card.component.css'
})

/**
 * Component to display a consultant's card with their details.
 * Role: for farmer view.
 */
export class ConsultantCardComponent {
  @Input() consultant!: Consultant;
}
