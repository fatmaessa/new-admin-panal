import { Routes } from '@angular/router';

export const tasksRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../components/tasks-library/tasks-library').then((m) => m.TasksLibrary),
  },
  {
    path: 'add',
    loadComponent: () => import('../components/add-task/add-task').then((m) => m.AddTask),
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('../components/add-task/add-task').then((m) => m.AddTask),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('../components/task-details/task-details').then((m) => m.TaskDetails),
  },
];
