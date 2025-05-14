import { Component } from '@angular/core';
import {ConsultantListComponent} from '../../components/consultant-list/consultant-list.component';
import {ConsultationFormComponent} from '../../components/consultation-form/consultation-form.component';
import {NgIf} from '@angular/common';
import {ConsultationListComponent} from '../../components/consultation-list/consultation-list.component';

@Component({
  selector: 'app-history-view',
  imports: [
    ConsultationListComponent
  ],
  templateUrl: './history-view.component.html',
  styleUrl: './history-view.component.css'
})
export class HistoryViewComponent {

}
