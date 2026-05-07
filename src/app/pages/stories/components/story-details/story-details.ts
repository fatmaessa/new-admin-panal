import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Sorties } from '../../services/sorties';
import { STORY } from '../../models/models';

@Component({
  selector: 'app-story-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './story-details.html',
  styleUrl: './story-details.scss',
})
export class StoryDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private storyService = inject(Sorties);

  story = signal<STORY | null>(null);
  loading = signal(true);
  isPlaying = signal(false);
  audio: HTMLAudioElement | null = null;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.storyService.getAllStories().subscribe({
        next: (res: any) => {
          const found = res.data.find((s: STORY) => s.storyId === Number(id));
          this.story.set(found ?? null);
          this.loading.set(false);
          if (!found) this.router.navigate(['/stories']);
        },
        error: () => {
          this.loading.set(false);
          this.router.navigate(['/stories']);
        },
      });
    }
  }

  toggleAudio(): void {
    const s = this.story();
    if (!s?.audioUrl) return;

    if (!this.audio) {
      this.audio = new Audio(s.audioUrl);
      this.audio.onended = () => this.isPlaying.set(false);
    }

    if (this.isPlaying()) {
      this.audio.pause();
      this.isPlaying.set(false);
    } else {
      this.audio.play();
      this.isPlaying.set(true);
    }
  }

  goBack(): void {
    this.audio?.pause();
    this.router.navigate(['/stories']);
  }

  ngOnDestroy(): void {
    this.audio?.pause();
  }
}
