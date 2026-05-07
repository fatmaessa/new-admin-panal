// video-details.ts
import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Video, VideoCategory } from '../../models/models';
import { Videos } from '../../services/videos';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-video-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-details.html',
  styleUrl: './video-details.scss',
})
export class VideoDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private videoService = inject(Videos);
  private toast = inject(ToastrService);

  video = signal<Video | null>(null);
  isLoading = signal(true);
  isDeleting = signal(false);
  showDeleteModal = signal(false);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.loadVideo(id);
  }
  getYoutubeThumbnail(): string | null {
    const url = this.video()?.url ?? '';
    const match = url.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    );
    return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null;
  }
  getCategoryClass(category: string): string {
    const base = 'px-3 py-1 rounded-full text-[10px] font-bold text-white ';
    const colors: Record<string, string> = {
      [VideoCategory.Islamic]: 'bg-indigo-500/90',
      [VideoCategory.Educational]: 'bg-blue-500/90',
      [VideoCategory.Entertainment]: 'bg-purple-500/90',
      [VideoCategory.Stories]: 'bg-pink-500/90',
    };
    return base + (colors[category] ?? 'bg-blue-500/90');
  }

  getBorderClass(): string {
    const borders: Record<string, string> = {
      [VideoCategory.Islamic]: 'border-indigo-400',
      [VideoCategory.Educational]: 'border-blue-400',
      [VideoCategory.Entertainment]: 'border-purple-400',
      [VideoCategory.Stories]: 'border-pink-400',
    };
    return borders[this.video()?.category ?? ''] ?? 'border-blue-400';
  }
  loadVideo(id: string) {
    this.isLoading.set(true);
    this.videoService.getVideoById(id).subscribe({
      next: (res: any) => {
        this.video.set(res.data);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }

  goToEdit() {
    this.router.navigate(['/videos/edit', this.video()!.id]);
  }

  confirmDelete() {
    this.showDeleteModal.set(true);
  }
  closeDeleteModal() {
    this.showDeleteModal.set(false);
  }

  submitDelete() {
    const v = this.video();
    if (!v) return;
    this.isDeleting.set(true);

    this.videoService.deleteVideo(String(v.id)).subscribe({
      next: () => {
        this.toast.success('تم حذف الفيديو بنجاح');
        this.router.navigate(['/videos']);
      },
      error: () => {
        this.toast.error('حدث خطأ أثناء الحذف');
        this.isDeleting.set(false);
      },
    });
  }

  goBack() {
    this.router.navigate(['/videos']);
  }

  getPlaceholderClass(): string {
    const gradients: Record<string, string> = {
      إسلامي: 'bg-gradient-to-br from-indigo-400 to-indigo-600',
      تعليمي: 'bg-gradient-to-br from-blue-400 to-blue-600',
      ترفيهي: 'bg-gradient-to-br from-purple-400 to-purple-600',
      قصص: 'bg-gradient-to-br from-pink-400 to-pink-600',
    };
    return gradients[this.video()?.category ?? ''] ?? 'bg-gradient-to-br from-blue-400 to-blue-600';
  }
}
