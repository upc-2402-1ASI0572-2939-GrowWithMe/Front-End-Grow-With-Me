import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConsultantListComponent } from '../../components/consultant-list/consultant-list.component';
import { ConsultationFormComponent } from '../../components/consultation-form/consultation-form.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-my-consultant-page',
  standalone: true,
  imports: [
    ConsultantListComponent,
    ConsultationFormComponent,
    NgIf
  ],
  templateUrl: './my-consultant-page.component.html',
  styleUrl: './my-consultant-page.component.css'
})

/**
 * Component to display the consultant page with a list of consultants and a form to request consultations.
 * Role: for farmer view.
 */
export class MyConsultantPageComponent {
  showForm = false;

  constructor(private router: Router) {}

  openForm() {
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
  }

  handleSubmit(data: any) {
    console.log('Form submitted:', data);
  }

  goToHistory() {
    const userId = 1; // Replace with the actual user/consultant ID logic
    this.router.navigate([`/consultants/${userId}/history`]);
  }
}
