import { Routes } from '@angular/router';
import { LogInPage} from './log-in-page/log-in-page';
import { HomePage } from './home-page/home-page';

export const routes: Routes = [
   { path:"login", component: LogInPage},
   { path:"", component: HomePage},
     {
    path: 'add-story',
    loadComponent: () => import('./stories/components/add-story/add-story')
      .then(m => m.AddStory)
  },
     {
    path: 'edit-story/:id',
    loadComponent: () => import('./stories/components/add-story/add-story')
      .then(m => m.AddStory)
  },
     {
    path: 'stories',
    loadComponent: () => import('./stories/components/stories/stories')
      .then(m => m.Stories)
  }
];
