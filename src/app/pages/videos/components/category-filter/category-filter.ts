// category-filter.ts
import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-filter.html',
  styleUrl: './category-filter.scss',
})
export class CategoryFilterComponent {
  @Output() categoryChanged = new EventEmitter<string>();

  categories = ['الكل', 'تعليمي', 'ترفيهي', 'إسلامي', 'قصص'];
  selectedCategory = 'الكل';

  selectCategory(cat: string) {
    this.selectedCategory = cat;
    this.categoryChanged.emit(cat);
  }
}
