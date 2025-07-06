import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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

  getAllDevicesByFarmerId(): Observable<Device[]> {
    return this.http.get<Device[]>(`${this.basePath}${this.resourceEndpoint}/farmer`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  createDevice(cropId: number, name: string): Observable<any> {
    const url = `${this.basePath}${this.resourceEndpoint}?cropId=${cropId}&name=${encodeURIComponent(name)}`;
    return this.http.post(url, {}, this.httpOptions);
  }
  activateDevice(deviceId: number): Observable<any> {
    const url = `${this.basePath}${this.resourceEndpoint}/activate/${deviceId}`;
    return this.http.post(url, {}, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
