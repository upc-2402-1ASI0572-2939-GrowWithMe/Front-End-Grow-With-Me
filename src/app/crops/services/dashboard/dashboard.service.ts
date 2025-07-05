import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from '../../../shared/services/base.service';

interface SensorDataResponse {
  temperatureList: number[];
  humidityList: number[];
}

@Injectable({
  providedIn: 'root'
})
export class EnvironmentDataService extends BaseService<any> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/devices';
  }

  getSensorDataByDeviceId(deviceId: number): Observable<SensorDataResponse> {
    return this.http.get<SensorDataResponse>(
      `${this.basePath}${this.resourceEndpoint}/sensor-data/${deviceId}`,
      this.httpOptions
    );
  }
}
