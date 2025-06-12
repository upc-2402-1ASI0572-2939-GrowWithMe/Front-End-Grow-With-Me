import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConsultantListComponent } from '../../components/consultant-list/consultant-list.component';
import { ConsultationFormComponent } from '../../components/consultation-form/consultation-form.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-my-consultant-page',
  standalone: true,
  imports: [
    ConsultantListComponent
  ],
  templateUrl: './my-consultant-page.component.html',
  styleUrl: './my-consultant-page.component.css'
})
export class MyConsultantPageComponent {

}
