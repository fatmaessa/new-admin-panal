import Swal from 'sweetalert2';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { VideosFiltersComponent } from '../videos-filters/videos-filters';
import { VideosTableComponent, VIDEO } from '../videos-table/videos-table';
import { Videos } from '../../services/videos';

@Component({
  selector: 'app-videos-page',
  standalone: true,
  imports: [CommonModule, VideosFiltersComponent, VideosTableComponent],
  templateUrl: './video-library.html',
})
export class VideoLibraryComponent implements OnInit {
  private videoServices = inject(Videos);
  private router = inject(Router);

  allVideos = signal<VIDEO[]>([]);
  selectedFilter = signal<string>('الكل');
  isLoading = signal(true);

  filteredVideos = computed(() => {
    const filter = this.selectedFilter();
    const all = this.allVideos();
    return filter === 'الكل' ? all : all.filter(v => v.category === filter);
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

  onFilters(type: string) {
    this.selectedFilter.set(type);
  }

  addVideo() {
    this.router.navigate(['/videos/add']);
  }

  deleteVideo(id: number) {
    Swal.fire({
      title: 'هل أنت متأكد؟',
      text: 'لن تتمكن من التراجع عن هذا الإجراء!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3B82F6',
      cancelButtonColor: '#94a3b8',
      confirmButtonText: 'نعم، احذفه!',
      cancelButtonText: 'إلغاء',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.videoServices.deleteVideo(id.toString()).subscribe();
        this.allVideos.update(videos => videos.filter(v => v.videoId !== id));
        Swal.fire({
          title: 'تم الحذف!',
          text: 'تم حذف الفيديو بنجاح.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  }
}