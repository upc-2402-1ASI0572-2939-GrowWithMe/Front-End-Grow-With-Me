import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Consultant } from '../../../profile/models/consultant.entity';
import { ConsultantsService } from '../../../profile/services/consultants/consultants.service';
import { ConsultantCardComponent } from '../consultant-card/consultant-card.component';

@Component({
  selector: 'app-consultant-list',
  standalone: true,
  imports: [CommonModule, ConsultantCardComponent],
  templateUrl: './consultant-list.component.html',
  styleUrl: './consultant-list.component.css'
})
export class ConsultantListComponent implements OnInit {
  consultants: Consultant[] = [];

  constructor(private consultantService: ConsultantsService) {}

  ngOnInit(): void {
    this.consultantService.getConsultants().subscribe(data => {
      this.consultants = data;
    });
  }
}
