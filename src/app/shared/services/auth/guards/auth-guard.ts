import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../auth-service';

// ── Main Auth Guard (checks login) ────────────────────────
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isAuthenticated()) {
    return true;
  }

  // Save attempted URL to redirect after login
  router.navigate(['/login'], {
    queryParams: { returnUrl: router.url },
  });
  return false;
};

// ── Role Guard (checks user role) ─────────────────────────
export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const requiredRoles: string[] = route.data?.['roles'] ?? [];

  if (!auth.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  const userRole = auth.userRole();
  if (requiredRoles.length && !requiredRoles.includes(userRole ?? '')) {
    router.navigate(['/unauthorized']);
    return false;
  }

  return true;
};

// ── Guest Guard (redirect logged-in users away from /login) ─
export const guestGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isAuthenticated()) {
    router.navigate(['']);
    return false;
  }

  return true;
};
