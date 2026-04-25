// services/videos.ts
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environment';
import { Video, NewVideo } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class Videos {
  private http = inject(HttpClient);
  private baseUrl = signal<string>(environment.apiUrl);

  getAllVideos() {
    return this.http.get(`${this.baseUrl()}videos`);
  }

  getVideoById(id: string) {
    return this.http.get(`${this.baseUrl()}videos/${id}`);
  }

  editVideo(id: string, body: Partial<NewVideo>) {
    return this.http.put(`${this.baseUrl()}videos/${id}`, body);
  }

  deleteVideo(id: string) {
    return this.http.delete(`${this.baseUrl()}videos/${id}`);
  }
  addVideo(body: NewVideo) {
    return this.http.post(`${this.baseUrl()}videos`, body);
  }
}
