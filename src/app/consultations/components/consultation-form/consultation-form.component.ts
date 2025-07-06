import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ConsultationService } from '../../services/consultations/consultation.service';
import { Consultation } from '../../models/consultation.entity';

@Component({
  selector: 'app-consultation-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consultation-form.component.html',
  styleUrls: ['./consultation-form.component.css']
})
export class ConsultationFormComponent {
  title: string = '';
  description: string = '';
  humidity: number | null = null;
  temperature: number | null = null;
  submitted: boolean = false;
  successModalVisible = false;

  @Output() submitConsultation = new EventEmitter<Consultation>();
  @Output() closeModal = new EventEmitter<void>();

  constructor(private consultationService: ConsultationService) {}

  handleSuccessAccept() {
    this.successModalVisible = false;
    this.closeModal.emit();
  }

  submitForm(form: NgForm) {
    this.submitted = true;
    if (form.invalid ) return;

    const farmerId = Number(localStorage.getItem('userId'));
    if (!farmerId) {
      alert("Farmer ID not found in local storage.");
      return;
    }

    const payload = {
      farmerId,
      title: this.title,
      description: this.description
    };

    this.consultationService.create(payload).subscribe({
      next: (created) => {
        this.submitConsultation.emit(created);
        this.successModalVisible = true;
      },
      error: () => {
        alert("An error occurred while sending your question.");
      }
    });
  }
}
