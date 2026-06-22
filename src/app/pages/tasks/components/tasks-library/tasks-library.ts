import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Category, Task } from '../../models/models';
import { Tasks } from '../../services/tasks';
import Swal from 'sweetalert2';
import { SearchComponent } from "../../../../shared/components/search/search";
import { SearchComponent } from "../../../../shared/components/search/search";
import { SearchResult } from '../../../../shared/models/search_models';

@Cimports: [RouterLink, SearchComponent]
  selector: 'app-tasks-library',
  imports: [RouterLink, SearchComponent],
  templateUrl: './tasks-library.html',
  styleUrl: './tasks-library.scss',
})
export class TasksLibrary implements OnInit {
  private taskService = inject(Tasks);
   private router = inject(Router); // ← هنا بدل الـ constructor
  onResultSelected(result: SearchResult) {
  console.log(result);
  // مثلاً navigate للعنصر
    this.router.navigate([`/tasks/${result.id}`]); // عدلي الـ route حسب الـ routing بتاعك
}

  allTasks = signal<Task[]>([]);
  // selectedFilter = signal<string>('all');
  selectedFilter = signal<Category | 'all'>('all');

  filters = [
    { key: 'all' as const, label: 'الكل' },
    { key: Category.Household, label: 'مهام منزلية' },
    { key: Category.Behavioral, label: 'مهام سلوكية' },
    { key: Category.Religious, label: 'مهام دينية' },
    { key: Category.Educational, label: 'مهام تعليمية' },
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
      // this.updateCounts();
    });
  }

  // updateCounts() {
  //   const tasks = this.allTasks();
  //   this.filters[0].count = tasks.length;
  //   this.filters[1].count = tasks.filter((t) => t.category === 'مهام دينية').length;
  //   this.filters[2].count = tasks.filter((t) => t.category === 'مهام سلوكية').length;
  //   this.filters[3].count = tasks.filter((t) => t.category === 'مهام منزلية').length;
  //   this.filters[3].count = tasks.filter((t) => t.category === 'مهام تعليمية').length;
  // }

  setFilter(key: Category | 'all') {
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
        // this.updateCounts();
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
    const icons: Record<Category, string> = {
      [Category.Religious]: '🕌',
      [Category.Household]: '🏠',
      [Category.Behavioral]: '🤝',
      [Category.Educational]: '🎓',
    };
    return icons[category as Category] ?? '📋';
  }
  getCategoryIconBg(category: Category): string {
    const bgs: Record<Category, string> = {
      [Category.Religious]: 'bg-green-50',
      [Category.Household]: 'bg-orange-50',
      [Category.Educational]: 'bg-blue-50',
      [Category.Behavioral]: 'bg-purple-50',
    };
    return bgs[category] ?? 'bg-gray-50';
  }
  getCategoryBadge(category: Category): string {
    const badges: Record<Category, string> = {
      [Category.Religious]: 'bg-green-100 text-green-700',
      [Category.Household]: 'bg-orange-100 text-orange-700',
      [Category.Educational]: 'bg-blue-100 text-[#0058be]',
      [Category.Behavioral]: 'bg-purple-100 text-purple-700',
    };
    return badges[category] ?? 'bg-gray-100 text-gray-600';
  }
}
