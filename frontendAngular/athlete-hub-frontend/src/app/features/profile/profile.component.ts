import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  
  readonly user = computed(() => this.userService.getUserSignal()());

  constructor(private userService: UserService) {}

  logout() {
    this.userService.logout();
  }
}
