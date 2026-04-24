import { Routes } from '@angular/router';
import { LogInPage} from './pages/log-in-page/log-in-page';
import { HomePage } from './pages/home-page/home-page';
import { VideoLibraryComponent } from './pages/video-library/video-library';

export const routes: Routes = [
   { path:"login", component: LogInPage},
   { path:"", component: HomePage},
   {path:"videos" , component:VideoLibraryComponent}
   ,
     {
    path: 'add-story',
    loadComponent: () => import('./pages/stories/components/add-story/add-story')
      .then(m => m.AddStory)
  },
     {
    path: 'edit-story/:id',
    loadComponent: () => import('./pages/stories/components/add-story/add-story')
      .then(m => m.AddStory)
  },
     {
    path: 'stories',
    loadComponent: () => import('./pages/stories/components/stories/stories')
      .then(m => m.Stories)
  }
];
