import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, BehaviorSubject, retry, catchError} from 'rxjs';
import {Notification} from '../models/notification.entity';
import {BaseService} from '../../shared/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService extends BaseService<Notification> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/notifications';
  }

  getAllNotificationsByFarmerId(farmerId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.basePath}${this.resourceEndpoint}?farmerId=${farmerId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
