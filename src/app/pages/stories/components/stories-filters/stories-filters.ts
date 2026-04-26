import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stories-filters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stories-filters.html',
    styleUrl: './stories-filters.scss',

})
export class StoriesFiltersComponent {
  @Output() filterChanged = new EventEmitter<string>();

  filters = [
    { label: 'الكل (٤٨)',    value: 'الكل'    },
    { label: 'دينية (١٢)',   value: 'دينية'   },
    { label: 'تعليمية (١٥)', value: 'تعليمية' },
    { label: 'دنيوية (٢١)', value: 'دنيوية'  },
  ];

  selectedFilter = 'الكل';

  selectFilter(filter: { label: string; value: string }) {
    this.selectedFilter = filter.value;
    this.filterChanged.emit(filter.value);
  }
}