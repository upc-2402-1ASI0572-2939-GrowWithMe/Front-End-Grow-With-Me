import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import {Notifications} from '../models/notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private apiUrl: string = 'http://localhost:3000/notifications';
  constructor(private http: HttpClient) { }

  getNotifications(): Observable<Notifications[]> {
    return this.http.get<Notifications[]>(this.apiUrl);
  }

  deleteNotification(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
