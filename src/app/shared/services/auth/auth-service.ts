import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { environment } from '../../../../environment';

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  user: {
    role: string;
    fullName: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = environment.apiUrl; // 🔁 Replace with your API
  private readonly TOKEN_KEY = 'token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private readonly USER_KEY = 'user';

  // ── Signals ──────────────────────────────────────────────
  currentUser = signal<LoginResponse['user'] | null>(this.loadUserFromStorage());
  isLoading = signal(false);
  authError = signal<string | null>(null);

  // Computed
  isAuthenticated = computed(() => !!this.currentUser() && !!this.getToken());
  userRole = computed(() => this.currentUser()?.role ?? null);

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  // ── Login ─────────────────────────────────────────────────
  login(credentials: LoginRequest): Observable<LoginResponse> {
    this.isLoading.set(true);
    this.authError.set(null);
    const newRequest = {
      email: credentials.email,
      password: credentials.password,
    };
    return this.http.post<any>(`${this.API_URL}auth/admin/login`, newRequest).pipe(
      tap((response) => {
        const newResponse = {
          success: response.success,
          message: response.message,
          token: response.token,
          user: {
            role: response.role,
            fullName: response.fullName,
          },
        };
        this.handleAuthSuccess(newResponse, credentials.rememberMe ?? false);
        this.isLoading.set(false);
      }),
      catchError((error) => {
        const message = error.error?.message || 'البريد الإلكتروني أو كلمة المرور غير صحيحة';
        this.authError.set(message);
        this.isLoading.set(false);
        return throwError(() => error);
      }),
    );
  }

  // ── Logout ────────────────────────────────────────────────
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    sessionStorage.removeItem(this.TOKEN_KEY);

    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  // ── Token Helpers ─────────────────────────────────────────
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY) || sessionStorage.getItem(this.TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  refreshToken(): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>(`${this.API_URL}/auth/refresh`, {
        refreshToken: this.getRefreshToken(),
      })
      .pipe(
        tap((res) => {
          localStorage.setItem(this.TOKEN_KEY, res.token);
        }),
      );
  }

  // ── Private Helpers ───────────────────────────────────────
  private handleAuthSuccess(response: LoginResponse, rememberMe: boolean): void {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem(this.TOKEN_KEY, response.token);

    localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
    this.currentUser.set(response.user);
  }

  private loadUserFromStorage(): LoginResponse['user'] | null {
    try {
      const stored = localStorage.getItem(this.USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }
}
