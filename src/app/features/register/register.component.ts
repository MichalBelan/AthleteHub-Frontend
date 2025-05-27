import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment.development';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
      // role: ['ATHLETE', Validators.required] ← toto vymaž
    });
  }

  submit() {
    if (this.form.valid) {
      this.http.post(environment.beUrl + '/api/users', this.form.value).subscribe({
        next: () => {
          alert('Úspešne zaregistrovaný!');
          this.router.navigate(['/']);
        },
        error: err => {
          if (err.status === 409) {
            alert('Používateľ s týmto emailom už existuje.');
          } else {
            alert('Nastala chyba pri registrácii.');
          }
        }
      });
    }
  }
}
