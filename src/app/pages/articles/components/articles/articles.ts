import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Article } from '../../models/models';
import Swal from 'sweetalert2';
import { ArticlesService } from '../../services/articles';

@Component({
  selector: 'app-articles',
  imports: [RouterLink],
  templateUrl: './articles.html',
  styleUrl: './articles.scss',
})
export class Articles implements OnInit {
  private articleService = inject(ArticlesService);

  allArticles = signal<Article[]>([]);
  selectedFilter = signal<string>('الكل');

  filteredArticles = computed(() => {
    const filter = this.selectedFilter();
    if (filter === 'الكل') return this.allArticles();
    return this.allArticles().filter((a: any) => a.category === filter);
  });

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles() {
    this.articleService.getAllArticles().subscribe((res: any) => {
      this.allArticles.set(res.data ?? res);
    });
  }

  onFilters(type: string) {
    this.selectedFilter.set(type);
  }

  deleteArticle(id: number) {
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
        this.articleService.deleteArticle(id).subscribe();
        this.allArticles.update((articles) => articles.filter((a) => a.id !== id));
        Swal.fire({
          title: 'تم الحذف!',
          text: 'تم حذف المقالة بنجاح.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  }
}
