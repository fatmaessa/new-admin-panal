import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { Video, VideoCategory } from '../../models/models';

@Component({
  selector: 'app-featured-video',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './featured-video.html',
  styleUrl: './featured-video.scss',
})
export class FeaturedVideoComponent {
  private router = inject(Router);

  video = input.required<Video>();

  navigateToDetails() {
    this.router.navigate(['/videos', this.video().id]);
  }

  getYoutubeThumbnail(): string | null {
    const url = this.video()?.url ?? '';
    const match = url.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    );
    return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null;
  }

  getBorderClass(): string {
    const borders: Record<VideoCategory, string> = {
      [VideoCategory.Islamic]: 'border-indigo-400',
      [VideoCategory.Educational]: 'border-blue-400',
      [VideoCategory.Entertainment]: 'border-purple-400',
      [VideoCategory.Stories]: 'border-pink-400',
    };
    return borders[this.video().category as VideoCategory] ?? 'border-blue-400';
  }

  getGradient(): string {
    const gradients: Record<string, string> = {
      إسلامي: 'bg-gradient-to-br from-indigo-400 to-indigo-600',
      تعليمي: 'bg-gradient-to-br from-blue-400 to-blue-600',
      ترفيهي: 'bg-gradient-to-br from-purple-400 to-purple-600',
      قصص: 'bg-gradient-to-br from-pink-400 to-pink-600',
    };
    return gradients[this.video().category] ?? 'bg-gradient-to-br from-blue-400 to-blue-600';
  }
}
