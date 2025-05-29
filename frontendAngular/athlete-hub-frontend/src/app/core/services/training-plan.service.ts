import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class TrainingPlanService {
  constructor(private http: HttpClient) {}

  private readonly baseUrl = environment.beUrl + '/api/training-plans';

  getByAthlete(athleteId: number) {
    return this.http.get<TrainingPlanDto[]>(`${this.baseUrl}/athlete/${athleteId}`);
  }

  create(plan: TrainingPlanDto) {
    return this.http.post(this.baseUrl, plan);
  }
}


export interface TrainingPlanDto {
  id?: number;
  title: string;
  schedule: string;
  athleteId: number;
}
