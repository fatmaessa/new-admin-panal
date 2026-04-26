import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Task } from '../../models/models';
import { Tasks } from '../../services/tasks';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tasks-library',
  imports: [RouterLink],
  templateUrl: './tasks-library.html',
  styleUrl: './tasks-library.scss',
})
export class TasksLibrary implements OnInit {
  private taskService = inject(Tasks);

  allTasks = signal<Task[]>([]);
  selectedFilter = signal<string>('all');

  filters = [
    { key: 'all', label: 'الكل', count: 0 },
    { key: 'مهام منزلية', label: 'مهام منزلية', count: 0 },
    { key: 'مهام دراسية', label: 'مهام دراسية', count: 0 },
    { key: 'مهام سلوكية', label: 'مهام سلوكية', count: 0 },
  ];

  filteredTasks = computed(() => {
    const filter = this.selectedFilter();
    const tasks = this.allTasks();
    if (filter === 'all') return tasks;
    return tasks.filter((t) => t.category === filter);
  });

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getAllTasks().subscribe((res: any) => {
      this.allTasks.set(res.data ?? res);
      this.updateCounts();
    });
  }

  updateCounts() {
    const tasks = this.allTasks();
    this.filters[0].count = tasks.length;
    this.filters[1].count = tasks.filter((t) => t.category === 'ديني').length;
    this.filters[2].count = tasks.filter((t) => t.category === 'مدرسي').length;
    this.filters[3].count = tasks.filter((t) => t.category === 'منزلي').length;
  }

  setFilter(key: string) {
    this.selectedFilter.set(key);
  }

  deleteTask(id: number) {
    Swal.fire({
      title: 'هل أنت متأكد؟',
      text: 'لن تتمكن من التراجع عن هذا الإجراء!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0058be',
      cancelButtonColor: '#94a3b8',
      confirmButtonText: 'نعم، احذفها!',
      cancelButtonText: 'إلغاء',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.taskService.deleteTask(id).subscribe();
        this.allTasks.update((tasks) => tasks.filter((t) => t.taskId !== id));
        this.updateCounts();
        Swal.fire({
          title: 'تم الحذف!',
          text: 'تم حذف المهمة بنجاح.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  }

  formatDate(id: number): string {
    const base = new Date('2023-01-05');
    base.setDate(base.getDate() + id * 3);
    return base.toLocaleDateString('ar-EG');
  }

  getCategoryIcon(category: string): string {
    const icons: Record<string, string> = { ديني: '🕌', منزلي: '🏠', مدرسي: '🎒' };
    return icons[category] ?? '📋';
  }

  getCategoryIconBg(category: string): string {
    const bgs: Record<string, string> = {
      ديني: 'bg-green-50',
      منزلي: 'bg-orange-50',
      مدرسي: 'bg-blue-50',
    };
    return bgs[category] ?? 'bg-gray-50';
  }

  getCategoryBadge(category: string): string {
    const badges: Record<string, string> = {
      ديني: 'bg-green-100 text-green-700',
      منزلي: 'bg-orange-100 text-orange-700',
      مدرسي: 'bg-blue-100 text-[#0058be]',
    };
    return badges[category] ?? 'bg-gray-100 text-gray-600';
  }
}
