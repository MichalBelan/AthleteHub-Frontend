import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, NotificationDto } from '../../core/services/notification.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {
  private notificationService = inject(NotificationService);
  private userService = inject(UserService);

  readonly notifications = signal<NotificationDto[]>([]);

  constructor() {
    effect(() => {
      const user = this.userService.getUserSignal()();
      if (user) {
        this.notificationService.getByUser(user.id).subscribe(data => this.notifications.set(data));
      }
    });
  }

  markAsRead(id: number) {
    this.notificationService.markAsRead(id).subscribe(() => {
      const updated = this.notifications().map(n =>
        n.id === id ? { ...n, read: true } : n
      );
      this.notifications.set(updated);
    });
  }
}
