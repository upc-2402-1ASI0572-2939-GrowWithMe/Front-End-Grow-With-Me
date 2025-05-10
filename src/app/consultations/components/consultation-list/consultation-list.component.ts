import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ConsultationService } from '../../services/consultations/consultation.service';
import { Consultation } from '../../models/consultation.entity';
import {ConsultationDetailsComponent} from '../consultation-details/consultation-details.component';

@Component({
  selector: 'app-consultation-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    ConsultationDetailsComponent
  ],
  templateUrl: './consultation-list.component.html',
  styleUrl: './consultation-list.component.css'
})
export class ConsultationListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'description', 'sensorData'];
  consultations: Consultation[] = [];

  constructor(private consultationService: ConsultationService) {}
  selectedConsultation: Consultation | null = null;

  selectConsultation(consultation: Consultation): void {
    this.selectedConsultation = consultation;
  }

  closeDetails(): void {
    this.selectedConsultation = null;
  }

  ngOnInit(): void {
    this.loadConsultations();
  }

  loadConsultations(): void {
    const farmerId = '1'; // Replace with dynamic ID later
    this.consultationService.getConsultationsByFarmerId(farmerId).subscribe(data => {
      this.consultations = data.sort((a, b) => a.id - b.id);
    });
  }


  viewConsultation(consultation: Consultation): void {
    console.log('Viewing consultation:', consultation);
  }

  deleteConsultation(consultation: Consultation): void {
    console.log('Deleting consultation:', consultation);
  }
}
