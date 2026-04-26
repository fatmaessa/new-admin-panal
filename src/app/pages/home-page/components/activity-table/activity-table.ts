import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Activity {
  title: string;
  image: string;
  type: string;
  points: number;
}

@Component({
  selector: 'app-activity-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activity-table.html',
      styleUrl: './activity-table.scss',

})
export class ActivityTableComponent {

  activities: Activity[] = [
    { title: 'مغامرة في الغابة',    image: 'assets/images/a1.jpg', type: 'قصة',   points: 100 },
    { title: 'ترتيب المكعبات',      image: 'assets/images/a2.jpg', type: 'مهمة',  points: 50  },
    { title: 'تعلم الحروف العربية', image: 'assets/images/a3.jpg', type: 'فيديو', points: 80  },
  ];

  getTypeBadge(type: string): string {
    const map: Record<string, string> = {
      'قصة':   'bg-primary-container/10 text-primary',
      'مهمة':  'bg-tertiary-container/10 text-tertiary',
      'فيديو': 'bg-secondary-container/10 text-secondary',
    };
    return map[type] ?? 'bg-slate-100 text-slate-600';
  }
}