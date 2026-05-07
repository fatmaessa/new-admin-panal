import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Tasks } from '../../services/tasks';
import { Category, CreateTask, Difficulty } from '../../models/models';

@Component({
  selector: 'app-add-task',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './add-task.html',
  styleUrl: './add-task.scss',
})
export class AddTask implements OnInit {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private toast = inject(ToastrService);
  private route = inject(ActivatedRoute);
  private taskService = inject(Tasks);
  categoryOptions = Object.values(Category);

  form!: FormGroup;
  isEditMode = signal(false);
  taskId: number | null = null;

  ngOnInit(): void {
    this.initForm();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.taskId = Number(id);
      this.isEditMode.set(true);
      this.loadTask(this.taskId);
    }
  }

  initForm() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      difficulty: ['', Validators.required],
      duration: [''],
      videoUrl: [''],
      pointsRewarded: [0, [Validators.required, Validators.min(1)]],
    });
  }

  loadTask(id: number) {
    this.taskService.getTaskById(id).subscribe({
      next: (res: any) => this.form.patchValue(res.data ?? res),
      error: () => this.toast.error('فشل في تحميل بيانات المهمة'),
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toast.error('يرجى ملء الحقول المطلوبة');
      return;
    }

    const taskData: CreateTask = this.form.value;

    if (this.isEditMode()) {
      this.taskService.updateTask(this.taskId!, taskData).subscribe({
        next: () => {
          this.toast.success('تم تحديث المهمة بنجاح');
          this.router.navigate(['/tasks']);
        },
        error: () => this.toast.error('حدث خطأ أثناء التحديث'),
      });
    } else {
      this.taskService.addNewTask(taskData).subscribe({
        next: () => {
          this.toast.success('تمت إضافة المهمة بنجاح!');
          this.router.navigate(['/tasks']);
        },
        error: () => this.toast.error('فشل في الإضافة'),
      });
    }
  }

  onCancel() {
    this.router.navigate(['/tasks']);
  }
}
