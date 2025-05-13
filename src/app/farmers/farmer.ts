import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Farmer} from './models/farmer';

@Injectable({
  providedIn: 'root'
})
export class FarmerService {
  private apiUrl = 'http://localhost:3000/farmers';

  constructor(private http: HttpClient) {}

  getFarmers(): Observable<Farmer[]> {
    return this.http.get<Farmer[]>(this.apiUrl);
  }

  deleteCrop(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
