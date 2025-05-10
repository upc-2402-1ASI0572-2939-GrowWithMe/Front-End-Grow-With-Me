import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Consultant } from '../../../profile/models/consultant.entity';
import { ConsultantService } from '../../../profile/services/consultants/consultant.service';
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

  constructor(private consultantService: ConsultantService) {}

  ngOnInit(): void {
    this.consultantService.getConsultants().subscribe(data => {
      this.consultants = data;
    });
  }
}
