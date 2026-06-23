import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SearchService } from '../../services/search/search_services';
import { SearchResult, ContentType } from '../../models/search_models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  templateUrl: './search.html',
  styleUrls: ['./search.scss'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class SearchComponent implements OnInit, OnDestroy {
  @ViewChild('searchInput') searchInputRef!: ElementRef;

  /**
   * لو حددتِ نوع معين، الـ component هيبحث فيه بس
   * ومش هيظهر الفلاتر خالص
   * مثال: <app-search [lockedType]="'story'">
   */
  @Input() lockedType: ContentType | null = null;

  @Output() resultSelected = new EventEmitter<SearchResult>();
  get currentPlaceholder(): string {
    if (this.lockedType) {
      return 'ابحث في ' + this.typeLabel[this.lockedType] + '...';
    }
    return 'ابحث في القصص، الفيديوهات، المهام، المقالات...';
  }

  getTypeIcon(type: string): string {
    return this.typeIcon[type as ContentType] ?? '';
  }

  getTypeLabel(type: string): string {
    return this.typeLabel[type as ContentType] ?? '';
  }

  searchControl = new FormControl('');

  results: SearchResult[] = [];
  isLoading = false;
  total = 0;
  showPanel = false;

  

  readonly typeLabel: Record<ContentType, string> = {
    story: 'قصة',
    video: 'فيديو',
    task: 'مهمة',
    article: 'مقال',
  };

  readonly typeIcon: Record<ContentType, string> = {
    story: '📖',
    video: '🎬',
    task: '✅',
    article: '📝',
  };

  private destroy$ = new Subject<void>();

  constructor(
    private searchSvc: SearchService,
    private elRef: ElementRef,
  ) {}

  ngOnInit() {
    // لو في lockedType، اقفل الفلتر عليه من الأول
  

    this.searchSvc.results$.pipe(takeUntil(this.destroy$)).subscribe((r) => {
      this.results = r;
      this.showPanel = r.length > 0 || (!!this.searchControl.value && !this.isLoading);
    });
    this.searchSvc.isLoading$.pipe(takeUntil(this.destroy$)).subscribe((v) => (this.isLoading = v));
    this.searchSvc.total$.pipe(takeUntil(this.destroy$)).subscribe((v) => (this.total = v));

    this.searchControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((q) => {
      if (!q) {
        this.searchSvc.clear();
        this.showPanel = false;
        return;
      }
      this.showPanel = true;
      this.searchSvc.search(q, this.lockedType?? "all");
    });
  }

  

  onSelect(result: SearchResult) {
    this.resultSelected.emit(result);
    this.clear();
  }

  clear() {
    this.searchControl.setValue('');
    this.searchSvc.clear();
    this.showPanel = false;
  }

  @HostListener('document:click', ['$event'])
  onOutsideClick(e: MouseEvent) {
    if (!this.elRef.nativeElement.contains(e.target)) this.showPanel = false;
  }

  @HostListener('keydown.escape')
  onEsc() {
    this.clear();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
