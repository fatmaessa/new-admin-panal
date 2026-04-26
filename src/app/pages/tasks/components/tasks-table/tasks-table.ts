import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Task {
  id: number;
  name: string;
  category: string;
  stars: number;
  date: string;
}

@Component({
  selector: 'app-tasks-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tasks-table.html',
    styleUrl: './tasks-table.scss',

})
export class TasksTableComponent {
  @Input() tasks: Task[] = [];
  @Output() editTask   = new EventEmitter<Task>();
  @Output() deleteTask = new EventEmitter<number>();

  currentPage = 1;

  onEdit(task: Task)     { this.editTask.emit(task); }
  onDelete(id: number)   { this.deleteTask.emit(id); }
  nextPage()             { this.currentPage++; }
  prevPage()             { if (this.currentPage > 1) this.currentPage--; }

  getCategoryBg(cat: string): string {
    const map: Record<string, string> = {
      'دينية':  'bg-green-50',
      'منزلية': 'bg-orange-50',
      'مدرسية': 'bg-blue-50',
    };
    return map[cat] ?? 'bg-slate-50';
  }

  getCategoryColor(cat: string): string {
    const map: Record<string, string> = {
      'دينية':  'text-green-600',
      'منزلية': 'text-orange-600',
      'مدرسية': 'text-blue-600',
    };
    return map[cat] ?? 'text-slate-600';
  }

  getCategoryIcon(cat: string): string {
    const map: Record<string, string> = {
      'دينية':  'mosque',
      'منزلية': 'home',
      'مدرسية': 'school',
    };
    return map[cat] ?? 'task';
  }

  getCategoryBadge(cat: string): string {
    const map: Record<string, string> = {
      'دينية':  'bg-green-100 text-green-700',
      'منزلية': 'bg-orange-100 text-orange-700',
      'مدرسية': 'bg-blue-100 text-blue-700',
    };
    return map[cat] ?? 'bg-slate-100 text-slate-700';
  }
}