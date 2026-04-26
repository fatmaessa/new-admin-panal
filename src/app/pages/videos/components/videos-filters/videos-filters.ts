import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-videos-filters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './videos-filters.html',
  styleUrl: './videos-filters.scss',
})
export class VideosFiltersComponent {
  @Output() filterChanged = new EventEmitter<string>();

  filters = [
    { label: 'الكل (٤٨)',     value: 'الكل'     },
    { label: 'تعليمية (١٥)',  value: 'تعليمية'  },
    { label: 'دينية (١٢)',    value: 'دينية'    },
    { label: 'ترفيهية (٢١)', value: 'ترفيهية'  },
  ];

  selectedFilter = 'الكل';

  selectFilter(filter: { label: string; value: string }) {
    this.selectedFilter = filter.value;
    this.filterChanged.emit(filter.value);
  }
}
