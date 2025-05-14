import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Consultation } from '../../models/consultation.entity';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {
  private apiUrl = 'http://localhost:3000/consultations';

  constructor(private http: HttpClient) {}

  getConsultationsByFarmerId(farmerId: string): Observable<Consultation[]> {
    return this.http.get<Consultation[]>(`${this.apiUrl}?farmerId=${farmerId}`);
  }

  createConsultation(consultation: Omit<Consultation, "id">): Observable<Consultation> {
    return this.http.post<Consultation>(this.apiUrl, consultation);
  }
}
