import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Activity } from '../../models/activity.entity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {
  private baseUrl = 'http://localhost:3000/cropActivities';

  constructor(private http: HttpClient) {}

  // Get all activities
  getAll(): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.baseUrl);
  }

  // Get activities by crop ID
  getByCropId(cropId: string): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${this.baseUrl}?cropId=${cropId}`);
  }

  // Create a new activity
  create(activity: { cropId: string; description: string; date: string }): Observable<Activity> {
    return this.http.post<Activity>(this.baseUrl, activity);
  }

  // Update an activity
  update(id: string, activity: { id: number; cropId: string; description: string; date: string }): Observable<Activity> {
    return this.http.put<Activity>(`${this.baseUrl}/${id}`, activity);
  }

  // Delete an activity
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
