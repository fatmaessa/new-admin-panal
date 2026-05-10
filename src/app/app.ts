import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Header } from './shared/components/header/header';
import { NavigationBar } from './shared/components/navigation-bar/navigation-bar';
import { AuthService } from './shared/services/auth/auth-service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationBar, Header, NgClass],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('new-admin-panal');

  private loginService = inject(AuthService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  // ── Signals ──────────────────────────────────────────────
  private currentUrl = signal(this.router.url);
  private token = signal(this.loginService.getToken());

  // Computed: hide layout on /login OR when not authenticated
  showLayout = computed(() => this.currentUrl() !== '/login' && !!this.token());

  ngOnInit(): void {
    // Update currentUrl signal on every navigation
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((event: NavigationEnd) => {
        this.currentUrl.set(event.urlAfterRedirects);
        this.token.set(this.loginService.getToken()); // re-check token after navigation
      });

    // Redirect to login if no token
    if (!this.token()) {
      this.router.navigate(['/login']);
    }
  }
}
