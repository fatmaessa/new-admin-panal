import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Videos } from '../videos/services/videos';
import { Sorties } from '../stories/services/sorties';
import { Tasks } from '../tasks/services/tasks';
import { Video } from '../videos/models/models';
import { STORY } from '../stories/models/models';
import { Task } from '../tasks/models/models';
import { SearchComponent } from "../../shared/components/search/search";
import { routeMap, SearchResult } from '../../shared/models/search_models';


@Component({
  selector: 'app-home-page',
  imports: [CommonModule, RouterModule, SearchComponent],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage implements OnInit {
  private videoService = inject(Videos);
  private storyService = inject(Sorties);
  private taskService = inject(Tasks);

  

  private router = inject(Router);
    onResultSelected(result: SearchResult) {
    console.log(result);
    // مثلاً navigate للعنصر
this.router.navigate([`/${routeMap[result.type]}/${result.id}`]);
  }
  
  storyLength = signal<number>(0);
  videosLength = signal<number>(0);
  taskLength = signal<number>(0);

  latestStory = signal<STORY | null>(null);
  latestVideo = signal<Video | null>(null);
  latestTask = signal<Task | null>(null);

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.videoService.getAllVideos().subscribe((res: any) => {
      const data: Video[] = res.data;
      this.videosLength.set(data.length);
      this.latestVideo.set(data[0] ?? null);
    });

    this.storyService.getAllStories().subscribe((res: any) => {
      const data: STORY[] = res.data;
      this.storyLength.set(data.length);
      this.latestStory.set(data[0] ?? null);
    });

    this.taskService.getAllTasks().subscribe((res: any) => {
      const data: Task[] = res.data;
      this.taskLength.set(data.length);
      this.latestTask.set(data[0] ?? null);
    });
  }
}
