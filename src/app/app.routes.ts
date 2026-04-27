import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home-page/home-page').then((m) => m.HomePage),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/log-in-page/log-in-page').then((m) => m.LogInPage),
  },
  {
    path: 'tasks',
    loadChildren: () => import('./pages/tasks/providers/tasks.routes').then((m) => m.tasksRoutes),
  },
  {
    path: 'videos',
    loadChildren: () =>
      import('../app/pages/videos/providers/videos.routes').then((m) => m.videosRoutes),
  },
  {
    path: 'stories',
    loadChildren: () =>
      import('../app/pages/stories/providers/stories.routes').then((m) => m.storiesRoutes),
  },
  { path: '**', redirectTo: '' },
];
