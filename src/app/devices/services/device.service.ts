import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Device} from '../models/device.entity';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private apiUrl = 'https://growithme-fake-api.onrender.com/devices';
  constructor(private http: HttpClient) { }

  createDevice(device: Omit<Device, "id">): Observable<Device> {
    return this.http.post<Device>(this.apiUrl, device);
  }

  getDevices(): Observable<Device[]> {
    return this.http.get<Device[]>(this.apiUrl);
  }

  getDevicesByFarmerId(farmerId: string): Observable<Device[]> {
    return this.http.get<Device[]>(`${this.apiUrl}?farmerId=${farmerId}`);
  }
}
