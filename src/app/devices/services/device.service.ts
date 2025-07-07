import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Device } from '../models/device.entity';
import { catchError, Observable, retry } from 'rxjs';
import { BaseService } from '../../shared/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceService extends BaseService<Device> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/devices';
  }

  // Solo se necesita cropId y name porque farmerId se obtiene por el token
  createDevice(cropId: number, name: string): Observable<Device> {
    const url = `${this.basePath}${this.resourceEndpoint}`;
    const body = { cropId, name };
    return this.http.post<Device>(url, body, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // No se pasa farmerId por query param; se obtiene del backend vía auth
  getAllDevicesByFarmerId(): Observable<Device[]> {
    const url = `${this.basePath}${this.resourceEndpoint}/farmer`;
    return this.http.get<Device[]>(url, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Retorna temperatura y humedad (no un Device completo)
  getSensorData(deviceId: number): Observable<any> {
    const url = `${this.basePath}${this.resourceEndpoint}/sensor-data/${deviceId}`;
    return this.http.get<any>(url, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  activateDevice(deviceId: number): Observable<any> {
    const url = `${this.basePath}${this.resourceEndpoint}/activate/${deviceId}`;
    return this.http.post<any>(url, {}, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
