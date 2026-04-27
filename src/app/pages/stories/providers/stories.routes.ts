import { Routes } from '@angular/router';

export const storiesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('../components/stories/stories').then((m) => m.Stories),
  },
  {
    path: 'add',
    loadComponent: () => import('../components/add-story/add-story').then((m) => m.AddStory),
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('../components/add-story/add-story').then((m) => m.AddStory),
  },
];
