import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { STORY } from '../../models/models';

// export interface Story {
//   id: number;
//   name: string;
//   image: string;
//   category: string;
//   stars: number;
//   date: string;
//   pages: number;
//   readTime: number;
// }

@Component({
  selector: 'app-stories-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stories-table.html',
    styleUrl: './stories-table.scss',

})
export class StoriesTableComponent {
  @Input() stories: STORY[] = [];
  @Output() editStory   = new EventEmitter<STORY>();
  @Output() deleteStory = new EventEmitter<number>();

  currentPage = 1;

  onEdit(story: STORY)   { this.editStory.emit(story); }
  onDelete(id: number)   { this.deleteStory.emit(id); }
  nextPage()             { this.currentPage++; }
  prevPage()             { if (this.currentPage > 1) this.currentPage--; }

  getCategoryBadge(cat: string): string {
    const map: Record<string, string> = {
      'دينية':   'bg-green-100 text-green-700',
      'تعليمية': 'bg-blue-100 text-blue-700',
      'دنيوية':  'bg-purple-100 text-purple-700',
    };
    return map[cat] ?? 'bg-slate-100 text-slate-700';
  }
}