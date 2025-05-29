import { Component, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PerformanceService, PerformanceDto } from '../../core/services/performance.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-performance-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './performance-list.component.html',
  styleUrls: ['./performance-list.component.scss']
})
export class PerformanceListComponent {
  readonly performances = signal<PerformanceDto[]>([]);
  readonly form = inject(FormBuilder).group({
    exerciseId: [0, Validators.required],
    result: [0, Validators.required]
  });

  private userService = inject(UserService);
  private performanceService = inject(PerformanceService);

  constructor() {
    effect(() => {
      const user = this.userService.getUserSignal()();
      if (user) {
        this.loadPerformances(user.id);
      }
    });
  }

  create() {
    const user = this.userService.getUserSignal()();
    if (!user) return;

    const formValue = this.form.getRawValue();
    const dto: PerformanceDto = {
      athleteId: user.id,
      exerciseId: formValue.exerciseId ?? 0,
      result: formValue.result ?? 0
    };

    this.performanceService.create(dto).subscribe(() => {
      this.loadPerformances(user.id);
      this.form.reset({ exerciseId: 0, result: 0 });
    });
  }

  private loadPerformances(userId: number) {
    this.performanceService.getByAthlete(userId).subscribe(p => this.performances.set(p));
  }
}
