// video-library.ts
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryFilterComponent } from '../category-filter/category-filter';
import { FeaturedVideoComponent, FeaturedVideo } from '../featured-video/featured-video';
import { VideoCardComponent } from '../video-card/video-card';
import { Video } from '../../models/models';
import { Videos } from '../../services/videos';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-library',
  standalone: true,
  imports: [CommonModule, VideoCardComponent, FeaturedVideoComponent, CategoryFilterComponent],
  templateUrl: './video-library.html',
  styleUrl: './video-library.scss',
})
export class VideoLibraryComponent implements OnInit {
  private videoServices = inject(Videos);
  private router = inject(Router);

  featuredVideo: FeaturedVideo = {
    title: 'رحلة ممتعة في عالم الأرقام',
    description: 'تعلم العد بطريقة تفاعلية مع أصدقائك في ونيسي.',
    thumbnail: 'assets/images/featured.jpg',
  };

  allVideos = signal<Video[]>([]);
  selectedCategory = signal<string>('الكل');
  isLoading = signal(true);

  // ✅ computed — يتحدث أوتوماتيك لما أي signal يتغير
  filteredVideos = computed(() => {
    const cat = this.selectedCategory();
    const all = this.allVideos();
    return cat === 'الكل' ? all : all.filter((v) => v.category === cat);
  });

  ngOnInit(): void {
    this.getAllVideos();
  }

  getAllVideos() {
    this.isLoading.set(true);
    this.videoServices.getAllVideos().subscribe({
      next: (res: any) => {
        this.allVideos.set(res.data);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }

  onCategoryChange(category: string) {
    this.selectedCategory.set(category);
  }
  goToAdd() {
    this.router.navigate(['/videos/add']);
  }
}
