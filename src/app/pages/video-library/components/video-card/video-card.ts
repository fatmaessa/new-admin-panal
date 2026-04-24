import { Component, Input } from '@angular/core';

export interface Video {
  title: string;
  thumbnail: string;
  duration: string;
  category: string;
  timeAgo: string;
  views: string;
}

@Component({
  selector: 'app-video-card',
  imports: [],
  templateUrl: './video-card.html',
  styleUrl: './video-card.scss',
})
export class VideoCardComponent {
  @Input() video: Video = {
    title: '',
    thumbnail: '',
    duration: '',
    category: '',
    timeAgo: '',
    views: ''
  };

  getCategoryClass(): string {
    const base = 'px-3 py-1 rounded-full text-[10px] font-bold text-white ';
    const colors: Record<string, string> = {
      'إسلامي':  'bg-indigo-500/90',
      'تعليمي':  'bg-blue-500/90',
      'ترفيهي':  'bg-purple-500/90',
      'قصص':     'bg-purple-500/90',
    };
    return base + (colors[this.video.category] ?? 'bg-blue-500/90');
  }
}
