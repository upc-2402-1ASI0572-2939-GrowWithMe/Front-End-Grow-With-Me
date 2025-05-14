import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Consultation } from '../../models/consultation.entity';

@Component({
  selector: 'app-consultation-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './consultation-details.component.html',
  styleUrl: './consultation-details.component.css'
})
export class ConsultationDetailsComponent {
  @Input() consultation!: Consultation;
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}
