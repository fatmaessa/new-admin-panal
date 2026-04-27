import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Tasks } from '../../services/tasks';
import { Task, Difficulty } from '../../models/models';

@Component({
  selector: 'app-task-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './task-details.html',
  styleUrl: './task-details.scss',
})
export class TaskDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private taskService = inject(Tasks);

  task = signal<Task | null>(null);
  loading = signal(true);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.taskService.getTaskById(Number(id)).subscribe({
        next: (res: any) => {
          this.task.set(res.data ?? res);
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
          this.router.navigate(['/tasks']);
        },
      });
    }
  }

  getDifficultyLabel(d: Difficulty): string {
    const map: Record<Difficulty, string> = {
      [Difficulty.Easy]: '🟢 سهل',
      [Difficulty.Medium]: '🟡 متوسط',
      [Difficulty.Hard]: '🔴 صعب',
    };
    return map[d] ?? d;
  }

  getDifficultyBadge(d: Difficulty): string {
    const map: Record<Difficulty, string> = {
      [Difficulty.Easy]: 'bg-green-100 text-green-700',
      [Difficulty.Medium]: 'bg-yellow-100 text-yellow-700',
      [Difficulty.Hard]: 'bg-red-100 text-red-600',
    };
    return map[d] ?? 'bg-gray-100 text-gray-600';
  }

  getCategoryIcon(category: string): string {
    const icons: Record<string, string> = { ديني: '🕌', منزلي: '🏠', مدرسي: '🎒' };
    return icons[category] ?? '📋';
  }

  goBack(): void {
    this.router.navigate(['/tasks']);
  }
}
