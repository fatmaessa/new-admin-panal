import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NewVideo } from '../../models/models';
import { Videos } from '../../services/videos';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-video',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './add-video.html',
  styleUrl: './add-video.scss',
})
export class AddVideo implements OnInit {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private toast = inject(ToastrService);
  private route = inject(ActivatedRoute);
  private videoService = inject(Videos);

  categories = ['تعليمي', 'ترفيهي', 'إسلامي', 'قصص'];
  form!: FormGroup;
  isEditMode = signal(false);
  isSubmitting = signal(false);
  videoId: string | null = null;

  ngOnInit(): void {
    this.initForm();
    this.videoId = this.route.snapshot.paramMap.get('id');
    if (this.videoId) {
      this.isEditMode.set(true);
      this.loadVideoData(this.videoId);
    }
  }

  initForm() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      url: ['', Validators.required],
      pointsRewarded: [0, [Validators.required, Validators.min(1)]],
    });
  }

  loadVideoData(id: string) {
    this.videoService.getVideoById(id).subscribe({
      next: (res: any) => this.form.patchValue(res.data),
      error: () => this.toast.error('فشل في تحميل بيانات الفيديو'),
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toast.error('يرجى ملء الحقول المطلوبة');
      return;
    }

    const videoData: NewVideo = this.form.value;
    this.isSubmitting.set(true);

    if (this.isEditMode()) {
      this.videoService.editVideo(this.videoId!, videoData).subscribe({
        next: () => {
          this.toast.success('تم تحديث الفيديو بنجاح');
          this.router.navigate(['/videos']);
        },
        error: () => {
          this.toast.error('حدث خطأ أثناء التحديث');
          this.isSubmitting.set(false);
        },
      });
    } else {
      this.videoService.addVideo(videoData).subscribe({
        next: () => {
          this.toast.success('تمت إضافة الفيديو بنجاح!');
          this.router.navigate(['/videos']);
        },
        error: () => {
          this.toast.error('فشل في الإضافة');
          this.isSubmitting.set(false);
        },
      });
    }
  }

  onCancel() {
    this.router.navigate(['/videos']);
  }
}
