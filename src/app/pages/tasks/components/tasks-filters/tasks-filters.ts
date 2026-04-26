import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasks-filters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tasks-filters.html',
    styleUrl: './tasks-filters.scss',

})
export class TasksFiltersComponent {
  @Output() filterChanged = new EventEmitter<string>();

  filters = [
    { label: 'الكل (١٢)',    value: 'الكل'    },
    { label: 'دينية (٤)',    value: 'دينية'   },
    { label: 'مدرسية (٥)',   value: 'مدرسية'  },
    { label: 'منزلية (٣)',   value: 'منزلية'  },
  ];

  selectedFilter = 'الكل';

  selectFilter(filter: { label: string; value: string }) {
    this.selectedFilter = filter.value;
    this.filterChanged.emit(filter.value);
  }
}
