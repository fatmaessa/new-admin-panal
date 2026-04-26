import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface NewTask {
  name: string;
  category: string;
  stars: number;
  description: string;
}

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-task.html',
  styleUrl: './add-task.scss',
})
export class AddTaskComponent {

  constructor(private router: Router) {}

  submitted = false;

  task: NewTask = {
    name: '',
    category: '',
    stars: 50,
    description: '',
  };

  categories = [
    { label: 'دينية',  value: 'دينية',  icon: 'mosque',      color: 'text-green-600',  },
    { label: 'منزلية', value: 'منزلية', icon: 'home',        color: 'text-orange-600', },
    { label: 'مدرسية', value: 'مدرسية', icon: 'school',      color: 'text-blue-600',   },
  ];

  onSubmit() {
    this.submitted = true;
    if (!this.task.name || !this.task.category) return;
    console.log('مهمة جديدة:', this.task);
    // هنا هتبعتي البيانات للـ API
    this.goBack();
  }

  goBack() {
    this.router.navigate(['/tasks']);
  }

  getSelectedCategoryBg(): string {
    const map: Record<string, string> = {
      'دينية':  'bg-green-50',
      'منزلية': 'bg-orange-50',
      'مدرسية': 'bg-blue-50',
    };
    return map[this.task.category] ?? 'bg-slate-50';
  }

  getSelectedCategoryColor(): string {
    const map: Record<string, string> = {
      'دينية':  'text-green-600',
      'منزلية': 'text-orange-600',
      'مدرسية': 'text-blue-600',
    };
    return map[this.task.category] ?? 'text-slate-600';
  }

  getSelectedCategoryIcon(): string {
    const map: Record<string, string> = {
      'دينية':  'mosque',
      'منزلية': 'home',
      'مدرسية': 'school',
    };
    return map[this.task.category] ?? 'task';
  }

  getSelectedCategoryBadge(): string {
    const map: Record<string, string> = {
      'دينية':  'bg-green-100 text-green-700',
      'منزلية': 'bg-orange-100 text-orange-700',
      'مدرسية': 'bg-blue-100 text-blue-700',
    };
    return map[this.task.category] ?? 'bg-slate-100 text-slate-700';
  }
}