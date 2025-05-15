import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Farmer} from '../../models/farmer.entity';

@Injectable({
  providedIn: 'root'
})
export class FarmersService {
  private apiUrl = 'https://growithme-fake-api.onrender.com/farmers';

  constructor(private http: HttpClient) {}

  getFarmers(): Observable<Farmer[]> {
    return this.http.get<Farmer[]>(this.apiUrl);
  }

  deleteCrop(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
