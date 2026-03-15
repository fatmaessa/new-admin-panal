import { Routes } from '@angular/router';
import { LogInPage} from './log-in-page/log-in-page';
import { HomePage } from './home-page/home-page';

export const routes: Routes = [
   { path:"login", component: LogInPage},
   { path:"", component: HomePage},
];
