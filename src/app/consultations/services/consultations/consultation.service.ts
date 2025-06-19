import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Consultation } from '../../models/consultation.entity';
import {BaseService} from '../../../shared/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService extends BaseService<Consultation> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/consultations';
  }

  getAllConsultationsByFarmerId(farmerId: number): Observable<Consultation[]> {
    return this.http.get<Consultation[]>(`${this.basePath}${this.resourceEndpoint}?farmerId=${farmerId}`, this.httpOptions);
  }
}
