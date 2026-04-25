import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { Video } from '../../models/models';

@Component({
  selector: 'app-featured-video',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './featured-video.html',
  styleUrl: './featured-video.scss',
})
export class FeaturedVideoComponent {
  private router = inject(Router);

  video = input.required<Video>();

  navigateToDetails() {
    this.router.navigate(['/videos', this.video().id]);
  }

  getGradient(): string {
    const gradients: Record<string, string> = {
      إسلامي: 'bg-gradient-to-br from-indigo-400 to-indigo-600',
      تعليمي: 'bg-gradient-to-br from-blue-400 to-blue-600',
      ترفيهي: 'bg-gradient-to-br from-purple-400 to-purple-600',
      قصص: 'bg-gradient-to-br from-pink-400 to-pink-600',
    };
    return gradients[this.video().category] ?? 'bg-gradient-to-br from-blue-400 to-blue-600';
  }
}
