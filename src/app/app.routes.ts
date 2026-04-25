import { Routes } from '@angular/router';
import { LogInPage } from './pages/log-in-page/log-in-page';
import { HomePage } from './pages/home-page/home-page';
import { VideoLibraryComponent } from './pages/videos/components/video-library/video-library';
import { VideoDetailsComponent } from './pages/videos/components/video-details/video-details';
import { AddVideo } from './pages/videos/components/add-video/add-video';

export const routes: Routes = [
  { path: 'login', component: LogInPage },
  { path: '', component: HomePage },
  { path: 'videos/add', component: AddVideo }, // ← أول
  { path: 'videos/edit/:id', component: AddVideo }, // ← تاني
  { path: 'videos/:id', component: VideoDetailsComponent }, // ← تالت
  { path: 'videos', component: VideoLibraryComponent },
  {
    path: 'add-story',
    loadComponent: () =>
      import('./pages/stories/components/add-story/add-story').then((m) => m.AddStory),
  },
  {
    path: 'edit-story/:id',
    loadComponent: () =>
      import('./pages/stories/components/add-story/add-story').then((m) => m.AddStory),
  },
  {
    path: 'stories',
    loadComponent: () =>
      import('./pages/stories/components/stories/stories').then((m) => m.Stories),
  },
];
