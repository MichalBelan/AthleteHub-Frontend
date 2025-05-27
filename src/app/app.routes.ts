import { Routes } from '@angular/router';
import {ProfileComponent} from './features/profile/profile.component';
import {RegisterComponent} from './features/register/register.component';

export const routes: Routes = [
  { path: '', component: ProfileComponent },
  { path: 'register', component: RegisterComponent }
];
