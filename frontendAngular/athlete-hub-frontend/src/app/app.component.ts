import { Component, computed, inject } from '@angular/core';
import { RouterOutlet,RouterModule } from '@angular/router';
import { UserService } from './core/services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'athlete-hub-frontend';


  private userService = inject(UserService);
  readonly user = this.userService.getUserSignal();

  login() {
    this.userService.login();
  }

  logout() {
    this.userService.logout();
  }
}
