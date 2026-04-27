import { Routes } from '@angular/router';

export const videosRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../components/video-library/video-library').then((m) => m.VideoLibraryComponent),
  },
  {
    path: 'add',
    loadComponent: () => import('../components/add-video/add-video').then((m) => m.AddVideo),
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('../components/add-video/add-video').then((m) => m.AddVideo),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('../components/video-details/video-details').then((m) => m.VideoDetailsComponent),
  },
];
