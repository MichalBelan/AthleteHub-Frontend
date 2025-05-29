import { Routes } from '@angular/router';
import {ProfileComponent} from './features/profile/profile.component';
import {RegisterComponent} from './features/register/register.component';
import {TrainingPlansComponent} from './features/training-plans/training-plans.component';
import {PerformanceListComponent} from './features/performances/performance-list.component';
import {GoalsComponent} from './features/goals/goals.component';
import {NotificationsComponent} from './features/notifications/notifications.component';

export const routes: Routes = [
  { path: '', component: ProfileComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'training-plans', component: TrainingPlansComponent },
  { path: 'performances', component: PerformanceListComponent },
  { path: 'goals', component: GoalsComponent },
  {path: 'notifications', component: NotificationsComponent}
];
