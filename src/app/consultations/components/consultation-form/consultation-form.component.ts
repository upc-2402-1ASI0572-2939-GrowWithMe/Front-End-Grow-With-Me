import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Consultation } from '../../models/consultation.entity';
import { ConsultationService } from '../../services/consultations/consultation.service';

@Component({
  selector: 'app-consultation-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consultation-form.component.html',
  styleUrl: './consultation-form.component.css'
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
    this.closeModal.emit(); // now close only after user clicks Accept
  }


  submitForm(form: NgForm) {
    this.submitted = true;
    if (form.invalid || this.humidity === null || this.temperature === null) return;

    this.consultationService.getConsultationsByFarmerId('1').subscribe(existing => {
      const maxId = existing.length > 0 ? Math.max(...existing.map(c => Number(c.id))) : 0;
      const newId = maxId + 1;

      const sensorData = `Humidity: ${this.humidity}%, Temp: ${this.temperature}°C`;

      const newConsultation: Consultation = {
        id: newId,
        title: this.title,
        description: this.description,
        date: new Date(),
        status: 'pending',
        farmerId: '1',
        sensorData
      };
      this.consultationService.createConsultation(newConsultation).subscribe({
        next: (created) => {
          this.submitConsultation.emit(created);
          this.successModalVisible = true; // show popup
        },
        error: () => {
          alert("An error occurred while sending your question.");
        }
      });
    });
  }
}
