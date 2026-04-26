import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environment';
import { Task, CreateTask } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class Tasks {
  private http = inject(HttpClient);
  private baseUrl = signal<string>(environment.apiUrl);

  getAllTasks() {
    return this.http.get<Task[]>(`${this.baseUrl()}tasks`);
  }

  getTaskById(id: number) {
    return this.http.get<Task>(`${this.baseUrl()}tasks/${id}`);
  }

  addNewTask(task: CreateTask) {
    return this.http.post<Task>(`${this.baseUrl()}tasks`, task);
  }

  updateTask(id: number, task: CreateTask) {
    return this.http.put<Task>(`${this.baseUrl()}tasks/${id}`, task);
  }

  deleteTask(id: number) {
    return this.http.delete(`${this.baseUrl()}tasks/${id}`);
  }
}
