import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

export interface PerformanceDto {
  athleteId: number;
  exerciseId: number;
  result: number;
}

@Injectable({ providedIn: 'root' })
export class PerformanceService {
  private http = inject(HttpClient);

  getByAthlete(athleteId: number): Observable<PerformanceDto[]> {
    return this.http.get<PerformanceDto[]>(`${environment.beUrl}/api/performances/athlete/${athleteId}`);
  }

  create(performance: PerformanceDto): Observable<void> {
    return this.http.post<void>(`${environment.beUrl}/api/performances`, performance);
  }
}
