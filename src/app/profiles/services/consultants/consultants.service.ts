import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Consultant} from '../../models/consultant.entity';

@Injectable({
  providedIn: 'root'
})
export class ConsultantsService {
  private apiUrl = 'https://growithme-fake-api.onrender.com/consultants';

  constructor(private http: HttpClient) {}

  getConsultants(): Observable<Consultant[]> {
    return this.http.get<Consultant[]>(this.apiUrl);
  }

  getConsultantById(id: number): Observable<Consultant> {
    return this.http.get<Consultant>(`${this.apiUrl}/${id}`);
  }
}
