import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Crop } from '../../models/crop.entity';
import { BaseService } from '../../../shared/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class CropsService extends BaseService<Crop> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/crops';
  }

  getAllCropsByFarmerId(farmerId: number): Observable<Crop[]> {
    return this.http.get<Crop[]>(`${this.basePath}${this.resourceEndpoint}/farmer/${farmerId}`, this.httpOptions);
  }
}
