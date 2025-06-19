import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Activity } from '../../models/activity.entity';
import {catchError, Observable, retry} from 'rxjs';
import {BaseService} from '../../../shared/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService extends BaseService<Activity> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/activities';
  }

  getAllCropActivitiesByCropId(cropId: number): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${this.basePath}${this.resourceEndpoint}?cropId=${cropId}`, this.httpOptions);
  }

  deleteAllCropActivitiesByCropId(cropId: number): Observable<void> {
    return this.http.delete<void>(`${this.basePath}${this.resourceEndpoint}?cropId=${cropId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
