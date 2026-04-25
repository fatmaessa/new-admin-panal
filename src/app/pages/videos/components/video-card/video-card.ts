// video-card.ts
import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Video } from '../../models/models';

@Component({
  selector: 'app-video-card',
  standalone: true,
  imports: [],
  templateUrl: './video-card.html',
  styleUrl: './video-card.scss',
})
export class VideoCardComponent {
  private router = inject(Router);

  @Input() video!: Video;

  navigateToDetails() {
    this.router.navigate(['/videos', this.video.id]);
  }

  getCategoryClass(): string {
    const base = 'px-3 py-1 rounded-full text-[10px] font-bold text-white ';
    const colors: Record<string, string> = {
      إسلامي: 'bg-indigo-500/90',
      تعليمي: 'bg-blue-500/90',
      ترفيهي: 'bg-purple-500/90',
      قصص: 'bg-pink-500/90',
    };
    return base + (colors[this.video.category] ?? 'bg-blue-500/90');
  }

  getPlaceholderClass(): string {
    const base = 'w-full h-full flex items-center justify-center ';
    const gradients: Record<string, string> = {
      إسلامي: 'bg-gradient-to-br from-indigo-400 to-indigo-600',
      تعليمي: 'bg-gradient-to-br from-blue-400 to-blue-600',
      ترفيهي: 'bg-gradient-to-br from-purple-400 to-purple-600',
      قصص: 'bg-gradient-to-br from-pink-400 to-pink-600',
    };
    return base + (gradients[this.video.category] ?? 'bg-gradient-to-br from-blue-400 to-blue-600');
  }
}
