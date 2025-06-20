import {Component, Input, OnInit} from '@angular/core';
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

/**
 * Component to display a list of consultations for a farmer.
 * Role: for farmer view.
 */
export class ConsultationListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'description', 'status', 'date'];
  consultations: Consultation[] = [];
  @Input() farmerId!:number;

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
    this.consultationService.getAllConsultationsByFarmerId(this.farmerId).subscribe(data => {
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
