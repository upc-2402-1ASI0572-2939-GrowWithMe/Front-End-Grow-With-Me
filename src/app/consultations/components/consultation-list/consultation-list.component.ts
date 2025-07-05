import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { ConsultationService } from '../../services/consultations/consultation.service';
import { Consultation } from '../../models/consultation.entity';
import { ConsultationDetailsComponent } from '../consultation-details/consultation-details.component';

@Component({
  selector: 'app-consultation-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    ConsultationDetailsComponent
  ],
  templateUrl: './consultation-list.component.html',
  styleUrls: ['./consultation-list.component.css']
})
export class ConsultationListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'description'];
  consultations: Consultation[] = [];
  selectedConsultation: Consultation | null = null;

  constructor(private consultationService: ConsultationService) {}

  ngOnInit(): void {
    const farmerId = Number(localStorage.getItem('userId'));
    if (!isNaN(farmerId) && farmerId > 0) {
      this.loadConsultations(farmerId);
    } else {
      console.error('Invalid or missing farmerId in localStorage');
    }
  }

  loadConsultations(farmerId: number): void {
    this.consultationService.getAllConsultationsByFarmerId(farmerId).subscribe({
      next: (data) => {
        this.consultations = data.sort((a, b) => a.id - b.id);
      },
      error: (err) => {
        console.error('Error loading consultations:', err);
      }
    });
  }

  selectConsultation(consultation: Consultation): void {
    this.selectedConsultation = consultation;
  }

  closeDetails(): void {
    this.selectedConsultation = null;
  }

  viewConsultation(consultation: Consultation): void {
    console.log('Viewing consultation:', consultation);
  }

  deleteConsultation(consultation: Consultation): void {
    console.log('Deleting consultation:', consultation);
  }
}
