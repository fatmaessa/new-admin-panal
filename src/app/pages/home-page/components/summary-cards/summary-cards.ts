import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-summary-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary-cards.html',
      styleUrl: './summary-cards.scss',

})
export class SummaryCardsComponent {
  cards = [
    {
      label:      'إجمالي القصص',
      value:      '1,284',
      textColor:  'text-primary',
      hoverColor: 'primary',
      badgeClass: 'bg-green-50 text-green-600',
      badgeIcon:  'fa-solid fa-arrow-trend-up',
      badgeText:  '12%+ هذا الشهر',
      iconBg:     'bg-primary-container/10 text-primary-container group-hover:bg-primary-container group-hover:text-white',
      icon:       'fa-solid fa-book-open',
    },
    {
      label:      'إجمالي الفيديوهات',
      value:      '856',
      textColor:  'text-secondary',
      hoverColor: 'secondary',
      badgeClass: 'bg-green-50 text-green-600',
      badgeIcon:  'fa-solid fa-arrow-trend-up',
      badgeText:  '5%+ هذا الأسبوع',
      iconBg:     'bg-secondary-container/10 text-secondary-container group-hover:bg-secondary-container group-hover:text-white',
      icon:       'fa-solid fa-film',
    },
    {
      label:      'إجمالي المهام',
      value:      '3,412',
      textColor:  'text-tertiary',
      hoverColor: 'tertiary',
      badgeClass: 'bg-primary-fixed text-primary',
      badgeIcon:  'fa-solid fa-circle-check',
      badgeText:  'معدل إنجاز عالي',
      iconBg:     'bg-tertiary-container/10 text-tertiary-container group-hover:bg-tertiary-container group-hover:text-white',
      icon:       'fa-solid fa-list-check',
    },
  ];
}