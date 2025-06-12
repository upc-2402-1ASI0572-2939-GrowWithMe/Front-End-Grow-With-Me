import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Crop} from '../../models/crop.entity';

@Injectable({
  providedIn: 'root'
})
export class CropsService {
  private apiUrl = 'https://growithme-fake-api.onrender.com/crops';

  constructor(private http: HttpClient) {}

  getCrops(): Observable<Crop[]> {
    return this.http.get<Crop[]>(this.apiUrl);
  }

  deleteCrop(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  createCrop(crop: Crop): Observable<Crop> {
    return this.http.post<Crop>(this.apiUrl, crop);
  }
}
