import { Component, signal, computed, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../shared/services/auth/auth-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './log-in-page.html',
  styleUrl: './log-in-page.scss',
})
export class LogInPage {
  // Signals
  isLoading = signal(false);
  showPassword = signal(false);
  loginError = signal<string | null>(null);
  loginService = inject(AuthService);
  // Computed signal: true if form was submitted
  submitted = signal(false);

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false],
    });
  }

  // Helpers to access controls cleanly
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  // Computed: show field error only after submit or field touched
  showEmailError = computed(() => this.submitted() && !!this.email?.invalid);

  showPasswordError = computed(() => this.submitted() && !!this.password?.invalid);

  togglePasswordVisibility() {
    this.showPassword.update((v) => !v);
  }

  async onSubmit() {
    this.submitted.set(true);
    this.loginError.set(null);

    if (this.loginForm.invalid) return;

    this.isLoading.set(true);

    this.fakeAuthCall(this.email?.value, this.password?.value).subscribe({
      next: (res) => {
        console.log(res);

        this.router.navigate(['']);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.loginError.set('البريد الإلكتروني أو كلمة المرور غير صحيحة');
        setTimeout(() => {
          this.loginError.set('');
        }, 3000);
      },
    });
  }

  // Remove this and replace with your AuthService
  private fakeAuthCall(email: string, password: string) {
    const obj = { email, password };
    return this.loginService.login(obj);
  }
}
