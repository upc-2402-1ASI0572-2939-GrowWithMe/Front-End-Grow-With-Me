import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Consultant } from '../../../profile/models/consultant.entity';
import { ConsultantsService } from '../../../profile/services/consultants/consultants.service';
import { ConsultantCardComponent } from '../consultant-card/consultant-card.component';
import {ConsultationFormComponent} from '../consultation-form/consultation-form.component';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-consultant-list',
  standalone: true,
  imports: [CommonModule, ConsultantCardComponent, ConsultationFormComponent],
  templateUrl: './consultant-list.component.html',
  styleUrl: './consultant-list.component.css'
})

/**
 * Component to display a list of consultants.
 * Role: for farmer view.
 */
export class ConsultantListComponent implements OnInit {
  showForm = false;
  consultants: Consultant[] = [];
  farmerId!: number;

  constructor(private consultantService: ConsultantsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.consultantService.getAll().subscribe(data => {
      this.consultants = data;
    });

    const id = this.route.snapshot.paramMap.get('farmerId');
    if (id) {
      this.farmerId = +id;
    } else {
      console.error('Farmer ID not found in route parameters');
      this.farmerId = 0;
    }
  }

  openForm() {
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
  }

  goToHistory() {
    this.router.navigate([`/consultants/${this.farmerId}/history`]);
  }

  handleSubmit(data: any) {
    console.log('Form submitted:', data);
  }
}
