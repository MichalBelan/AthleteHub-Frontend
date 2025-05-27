import { Component, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDto, UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  readonly user = signal<UserDto | undefined>(undefined);

  constructor(private userService: UserService) {
    effect(() => {
      this.user.set(this.userService.getUserSignal()());
    });
  }

  logout() {
    this.userService.logout();
  }
}
