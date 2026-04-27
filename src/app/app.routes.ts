import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home-page/home-page').then((m) => m.HomePage),
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/log-in-page/log-in-page').then((m) => m.LogInPage),
    canActivate: [guestGuard]
  },
  {
    path: 'tasks',
    loadChildren: () => import('./pages/tasks/providers/tasks.routes').then((m) => m.tasksRoutes),
    canActivate: [authGuard],
  },
  {
    path: 'videos',
    loadChildren: () =>
      import('../app/pages/videos/providers/videos.routes').then((m) => m.videosRoutes),
    canActivate: [authGuard],
  },
  {
    path: 'stories',
    loadChildren: () =>
      import('../app/pages/stories/providers/stories.routes').then((m) => m.storiesRoutes),
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: 'login' },
];
