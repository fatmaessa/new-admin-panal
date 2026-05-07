import { Routes } from '@angular/router';

export const articlesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('../components/articles/articles').then((m) => m.Articles),
  },
  {
    path: 'add',
    loadComponent: () => import('../components/add-article/add-article').then((m) => m.AddArticle),
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('../components/add-article/add-article').then((m) => m.AddArticle),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('../components/article-details/article-details').then((m) => m.ArticleDetails),
  },
];
