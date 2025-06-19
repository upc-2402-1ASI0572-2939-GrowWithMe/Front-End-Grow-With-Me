import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Device} from '../models/device.entity';
import {catchError, Observable, retry} from 'rxjs';
import {BaseService} from '../../shared/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceService extends BaseService<Device> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/devices';
  }

  getAllDevicesByCropId(cropId: number): Observable<Device[]> {
    return this.http.get<Device[]>(`${this.basePath}${this.resourceEndpoint}?cropId=${cropId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getAllDevicesByFarmerId(farmerId: number): Observable<Device[]> {
    return this.http.get<Device[]>(`${this.basePath}${this.resourceEndpoint}?farmerId=${farmerId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
