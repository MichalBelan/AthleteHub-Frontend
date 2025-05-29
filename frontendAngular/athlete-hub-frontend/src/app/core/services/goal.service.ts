import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

export interface GoalDto {
  id?: number;
  description: string;
  targetDate: string;
  achieved: boolean;
  athleteId: number; 
}

@Injectable({ providedIn: 'root' })
export class GoalService {
  private readonly baseUrl = `${environment.beUrl}/api/goals`;

  constructor(private http: HttpClient) {}

  create(goal: GoalDto): Observable<void> {
    return this.http.post<void>(this.baseUrl, goal);
  }

  getByUser(userId: number): Observable<GoalDto[]> {
    return this.http.get<GoalDto[]>(`${this.baseUrl}/athlete/${userId}`);
  }

  toggleAchieved(goalId: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${goalId}/toggle`, {});
  }
}
