import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { CreateArticle } from '../../models/models';
import { ArticlesService } from '../../services/articles';

@Component({
  selector: 'app-add-article',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './add-article.html',
  styleUrl: './add-article.scss',
})
export class AddArticle implements OnInit {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private toast = inject(ToastrService);
  private route = inject(ActivatedRoute);
  private articleService = inject(ArticlesService);

  form!: FormGroup;
  isEditMode = signal(false);
  articleId: number | null = null;

  ngOnInit(): void {
    this.initForm();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.articleId = Number(id);
      this.isEditMode.set(true);
      this.loadArticle(this.articleId);
    }
  }

  initForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: ['', Validators.required],
      link: ['', Validators.required],
    });
  }

  loadArticle(id: number) {
    this.articleService.getArticleById(id).subscribe({
      next: (res: any) => this.form.patchValue(res.data ?? res),
      error: () => this.toast.error('فشل في تحميل بيانات المقالة'),
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toast.error('يرجى ملء الحقول المطلوبة');
      return;
    }

    const data: CreateArticle = this.form.value;

    if (this.isEditMode()) {
      this.articleService.updateArticle(this.articleId!, data).subscribe({
        next: () => {
          this.toast.success('تم تحديث المقالة بنجاح');
          this.router.navigate(['/articles']);
        },
        error: () => this.toast.error('حدث خطأ أثناء التحديث'),
      });
    } else {
      this.articleService.addNewArticle(data).subscribe({
        next: () => {
          this.toast.success('تمت إضافة المقالة بنجاح!');
          this.router.navigate(['/articles']);
        },
        error: () => this.toast.error('فشل في الإضافة'),
      });
    }
  }

  onCancel() {
    this.router.navigate(['/articles']);
  }
}
