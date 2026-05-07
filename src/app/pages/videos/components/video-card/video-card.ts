import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Video, VideoCategory } from '../../models/models';

@Component({
  selector: 'app-video-card',
  standalone: true,
  imports: [CommonModule],
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
      [VideoCategory.Islamic]: 'bg-indigo-500/90',
      [VideoCategory.Educational]: 'bg-blue-500/90',
      [VideoCategory.Entertainment]: 'bg-purple-500/90',
      [VideoCategory.Stories]: 'bg-pink-500/90',
    };
    return base + (colors[this.video.category] ?? 'bg-blue-500/90');
  }

  getYoutubeThumbnail(): string | null {
    const url = this.video?.url ?? '';
    const match = url.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    );
    return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null;
  }

  getBorderClass(): string {
    const borders: Record<string, string> = {
      [VideoCategory.Islamic]: 'border-indigo-400',
      [VideoCategory.Educational]: 'border-blue-400',
      [VideoCategory.Entertainment]: 'border-purple-400',
      [VideoCategory.Stories]: 'border-pink-400',
    };
    return borders[this.video.category] ?? 'border-blue-400';
  }
}
