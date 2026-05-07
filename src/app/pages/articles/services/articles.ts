import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environment';
import { CreateArticle } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  private http = inject(HttpClient);
  private baseUrl = signal<string>(environment.apiUrl);

  getAllArticles() {
    return this.http.get(`${this.baseUrl()}articles`);
  }

  getArticleById(id: number) {
    return this.http.get(`${this.baseUrl()}articles/${id}`);
  }

  addNewArticle(article: CreateArticle) {
    return this.http.post(`${this.baseUrl()}articles`, article);
  }

  updateArticle(id: number, article: CreateArticle) {
    return this.http.put(`${this.baseUrl()}articles/${id}`, article);
  }

  deleteArticle(id: number) {
    return this.http.delete(`${this.baseUrl()}articles/${id}`);
  }
}
