import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface VIDEO {
  videoId: number;
  title: string;
  thumbnailUrl: string;
  category: string;
  pointsRewarded: number;
  duration: number;
  date: string;
}

@Component({
  selector: 'app-videos-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './videos-table.html',
  styleUrl: './videos-table.scss',
})
export class VideosTableComponent {
  @Input() videos: VIDEO[] = [];
  @Output() editVideo   = new EventEmitter<VIDEO>();
  @Output() deleteVideo = new EventEmitter<number>();

  currentPage = 1;

  onEdit(video: VIDEO)  { this.editVideo.emit(video); }
  onDelete(id: number)  { this.deleteVideo.emit(id); }
  nextPage()            { this.currentPage++; }
  prevPage()            { if (this.currentPage > 1) this.currentPage--; }

  getCategoryBadge(cat: string): string {
    const map: Record<string, string> = {
      'تعليمية': 'bg-blue-100 text-blue-700',
      'دينية':   'bg-purple-100 text-purple-700',
      'ترفيهية': 'bg-green-100 text-green-700',
    };
    return map[cat] ?? 'bg-slate-100 text-slate-700';
  }
}