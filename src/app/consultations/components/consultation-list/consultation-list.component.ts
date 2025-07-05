import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { ConsultationService } from '../../services/consultations/consultation.service';
import { Consultation } from '../../models/consultation.entity';
import { ConsultationDetailsComponent } from '../consultation-details/consultation-details.component';
import { ActivatedRoute } from '@angular/router';

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

  constructor(
    private consultationService: ConsultationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const role = localStorage.getItem('userRole');
    const userId = Number(localStorage.getItem('userId'));

    if (role === 'FARMER_ROLE') {
      if (!isNaN(userId) && userId > 0) {
        this.loadConsultations(userId);
      } else {
        console.error('Farmer ID inválido o ausente en localStorage');
      }
    } else if (role === 'CONSULTANT_ROLE') {
      this.loadAllConsultations();
    } else {
      console.error('Rol no reconocido:', role);
    }
  }

  loadConsultations(farmerId: number): void {
    this.consultationService.getAllConsultationsByFarmerId(farmerId).subscribe({
      next: (data) => {
        this.consultations = data.sort((a, b) => a.id - b.id);
      },
      error: (err) => {
        console.error('Error loading consultations by farmerId:', err);
      }
    });
  }

  loadAllConsultations(): void {
    this.consultationService.getAll().subscribe({
      next: (data) => {
        this.consultations = data.sort((a, b) => a.id - b.id);
      },
      error: (err) => {
        console.error('Error cargando todas las consultas:', err);
      }
    });
  }


  selectConsultation(consultation: Consultation): void {
    this.selectedConsultation = consultation;
  }

  closeDetails(): void {
    this.selectedConsultation = null;
  }
}
