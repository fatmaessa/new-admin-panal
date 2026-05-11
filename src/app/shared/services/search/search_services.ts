import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject, combineLatest, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  catchError,
  finalize,
  map,
} from 'rxjs/operators';

import {
  ApiResponse,
  StoryItem,
  TaskItem,
  VideoItem,
  ArticleItem,
  SearchResult,
  ContentType,
  mapStory,
  mapTask,
  mapVideo,
  mapArticle,
} from '../../models/search_models';

const BASE = 'https://waneesy.runasp.net/api/v1';

@Injectable({ providedIn: 'root' })
export class SearchService {
  private searchTrigger$ = new Subject<{ query: string; type: ContentType | 'all' }>();

  results$    = new BehaviorSubject<SearchResult[]>([]);
  isLoading$  = new BehaviorSubject<boolean>(false);
  total$      = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {
    this.setupPipeline();
  }

  // ─── public ───────────────────────────────────────────────
  search(query: string, type: ContentType | 'all' = 'all') {
    if (!query.trim()) { this.clear(); return; }
    this.searchTrigger$.next({ query: query.trim(), type });
  }

  clear() {
    this.results$.next([]);
    this.total$.next(0);
  }

  // ─── private ──────────────────────────────────────────────
  private setupPipeline() {
    this.searchTrigger$.pipe(
      debounceTime(400),
      distinctUntilChanged((a, b) => a.query === b.query && a.type === b.type),
      switchMap(({ query, type }) => {
        this.isLoading$.next(true);
        return this.fetchAll(type).pipe(
          map(all => this.filterLocally(all, query)),
          catchError(() => of([])),
          finalize(() => this.isLoading$.next(false)),
        );
      }),
    ).subscribe(results => {
      this.results$.next(results);
      this.total$.next(results.length);
    });
  }

  /**
   * جيب البيانات من الـ endpoints المطلوبة حسب الفلتر
   * API مفيهاش search param، فبنجيب الكل ونفلتر locally
   */
  private fetchAll(type: ContentType | 'all') {
    const fetch$ = {
      story:   this.http.get<ApiResponse<StoryItem>>  (`${BASE}/stories`).pipe(map(r => r.data.map(mapStory)),   catchError(() => of([]))),
      task:    this.http.get<ApiResponse<TaskItem>>   (`${BASE}/tasks`).pipe(map(r => r.data.map(mapTask)),    catchError(() => of([]))),
      video:   this.http.get<ApiResponse<VideoItem>>  (`${BASE}/videos`).pipe(map(r => r.data.map(mapVideo)),   catchError(() => of([]))),
      article: this.http.get<ApiResponse<ArticleItem>>(`${BASE}/articles`).pipe(map(r => r.data.map(mapArticle)), catchError(() => of([]))),
    };

    const selected = type === 'all'
      ? [fetch$.story, fetch$.task, fetch$.video, fetch$.article]
      : [fetch$[type]];

    return combineLatest(selected).pipe(
      map((arrays: SearchResult[][]) => ([] as SearchResult[]).concat(...arrays)),
    );
  }

  /** فلترة بسيطة على title + description + category */
  private filterLocally(all: SearchResult[], query: string): SearchResult[] {
    const q = query.toLowerCase();
    return all.filter(item =>
      item.title.toLowerCase().includes(q) ||
      item.description?.toLowerCase().includes(q) ||
      item.category?.toLowerCase().includes(q)
    );
  }
}