import { Component, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { GoalService, GoalDto } from '../../core/services/goal.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-goals',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss']
})
export class GoalsComponent {
  readonly goals = signal<GoalDto[]>([]);
  readonly form = inject(FormBuilder).group({
    description: ['', Validators.required],
    targetDate: ['', Validators.required]
  });

  private goalService = inject(GoalService);
  private userService = inject(UserService);

  constructor() {
    effect(() => {
      const user = this.userService.getUserSignal()();
      if (user) {
        this.goalService.getByUser(user.id).subscribe(goals => this.goals.set(goals));
      }
    });
  }

  create() {
    const user = this.userService.getUserSignal()();
    if (!user) return;

    const formValue = this.form.getRawValue();
    const targetDate = formValue.targetDate ? new Date(formValue.targetDate as string).toISOString().split('T')[0] : '';

    const dto: GoalDto = {
      description: formValue.description ?? '',
      targetDate,
      achieved: false,
      athleteId: user.id 
    };


    this.goalService.create(dto).subscribe(() => {
      this.goalService.getByUser(user.id).subscribe(goals => this.goals.set(goals));
      this.form.reset();
    });
  }

  toggle(goal: GoalDto) {
    this.goalService.toggleAchieved(goal.id!).subscribe(() => {
      const updated = this.goals().map(g =>
        g.id === goal.id ? { ...g, achieved: !g.achieved } : g
      );
      this.goals.set(updated);
    });
  }
}
