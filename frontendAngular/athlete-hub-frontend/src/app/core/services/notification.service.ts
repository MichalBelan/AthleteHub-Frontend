import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

export interface NotificationDto {
  id: number;
  userId: number;
  message: string;
  read: boolean;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly baseUrl = `${environment.beUrl}/api/notifications`;

  constructor(private http: HttpClient) {}

  getByUser(userId: number): Observable<NotificationDto[]> {
    return this.http.get<NotificationDto[]>(`${this.baseUrl}/user/${userId}`);
  }

  create(notification: Omit<NotificationDto, 'id'>): Observable<void> {
    return this.http.post<void>(this.baseUrl, notification);
  }

  markAsRead(id: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}/read`, {});
  }
}
