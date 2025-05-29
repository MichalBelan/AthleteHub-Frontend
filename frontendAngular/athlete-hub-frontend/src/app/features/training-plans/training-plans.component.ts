import { Component, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TrainingPlanService, TrainingPlanDto } from '../../core/services/training-plan.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-training-plans',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './training-plans.component.html',
  styleUrls: ['./training-plans.component.scss']
})
export class TrainingPlansComponent {
  readonly trainingPlans = signal<TrainingPlanDto[]>([]);
  readonly form = inject(FormBuilder).group({
    title: ['', Validators.required],
    schedule: ['', Validators.required]
  });

  private userService = inject(UserService);
  private trainingPlanService = inject(TrainingPlanService);

  constructor() {
    effect(() => {
      const user = this.userService.getUserSignal()();
      if (user) {
        this.trainingPlanService.getByAthlete(user.id).subscribe(plans => this.trainingPlans.set(plans));
      }
    });
  }

  create() {
    const user = this.userService.getUserSignal()();
    if (!user) return;

    const formValue = this.form.getRawValue();
    const rawDate = formValue.schedule;

    // Ošetrenie dátumu a formátovanie na ISO string bez času
    const formattedDate = rawDate
      ? new Date(rawDate).toISOString().split('T')[0]
      : '';

    const dto: TrainingPlanDto = {
      title: formValue.title ?? '',
      schedule: formattedDate,
      athleteId: user.id
    };

    this.trainingPlanService.create(dto).subscribe(() => {
      this.trainingPlanService
        .getByAthlete(user.id)
        .subscribe(plans => this.trainingPlans.set(plans));
      this.form.reset();
    });
  }


}
