import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Article } from '../../models/models';
import { ArticlesService } from '../../services/articles';

@Component({
  selector: 'app-article-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './article-details.html',
  styleUrl: './article-details.scss',
})
export class ArticleDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private articleService = inject(ArticlesService);

  article = signal<Article | null>(null);
  loading = signal(true);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.articleService.getArticleById(Number(id)).subscribe({
        next: (res: any) => {
          this.article.set(res.data ?? res);
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
          this.router.navigate(['/articles']);
        },
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/articles']);
  }
}
