import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Consultant } from '../../../profiles/models/consultant.entity';
import { ConsultantsService } from '../../../profiles/services/consultants/consultants.service';
import { ConsultantCardComponent } from '../consultant-card/consultant-card.component';
import {ConsultationFormComponent} from '../consultation-form/consultation-form.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-consultant-list',
  standalone: true,
  imports: [CommonModule, ConsultantCardComponent, ConsultationFormComponent],
  templateUrl: './consultant-list.component.html',
  styleUrl: './consultant-list.component.css'
})
export class ConsultantListComponent implements OnInit {
  showForm = false;
  consultants: Consultant[] = [];
  constructor(private consultantService: ConsultantsService, private router: Router) {}

  ngOnInit(): void {
    this.consultantService.getConsultants().subscribe(data => {
      this.consultants = data;
    });
  }
  openForm() {
    this.showForm = true;
  }
  closeForm() {
    this.showForm = false;
  }
  goToHistory() {
    const userId = 1;
    this.router.navigate([`/consultants/${userId}/history`]);
  }
  handleSubmit(data: any) {
    console.log('Form submitted:', data);
  }
}
