import { Component } from '@angular/core';
import { Video, VideoCardComponent } from './components/video-card/video-card';
import { FeaturedVideo, FeaturedVideoComponent } from './components/featured-video/featured-video';
import { CommonModule } from '@angular/common';
import { CategoryFilterComponent } from './components/category-filter/category-filter';

@Component({
  selector: 'app-video-library',
  standalone: true,
  imports: [
    CommonModule,
    VideoCardComponent,
    FeaturedVideoComponent,
    CategoryFilterComponent,
  ],
  templateUrl: './video-library.html',
  styleUrl: './video-library.scss',
})
export class VideoLibraryComponent {

  featuredVideo: FeaturedVideo = {
    title: 'رحلة ممتعة في عالم الأرقام',
    description: 'تعلم العد بطريقة تفاعلية مع أصدقائك في ونيسي.',
    thumbnail: 'assets/images/featured.jpg'
  };

  allVideos: Video[] = [
    { title: 'أذكار الصباح والمساء للصغار', thumbnail: 'assets/images/v1.jpg', duration: '12:45', category: 'إسلامي',  timeAgo: 'قبل ٢ يوم',        views: '١.٢ ألف مشاهدة' },
    { title: 'تعلم الحروف العربية بالرسم',  thumbnail: 'assets/images/v2.jpg', duration: '08:20', category: 'تعليمي',  timeAgo: 'قبل أسبوع',        views: '٣.٥ ألف مشاهدة' },
    { title: 'مغامرة الأرنب شطور في الغابة', thumbnail: 'assets/images/v3.jpg', duration: '05:15', category: 'ترفيهي', timeAgo: 'قبل ساعة واحدة',   views: '٨٤٢ مشاهدة'      },
    { title: 'تجارب علمية بسيطة في المنزل',  thumbnail: 'assets/images/v4.jpg', duration: '15:30', category: 'تعليمي',  timeAgo: 'قبل ٣ أيام',       views: '٩٠٠ مشاهدة'      },
    { title: 'قصة النبي يونس عليه السلام',   thumbnail: 'assets/images/v5.jpg', duration: '20:10', category: 'إسلامي',  timeAgo: 'قبل أسبوعين',      views: '٥.١ ألف مشاهدة' },
    { title: 'حكايات قبل النوم: القرد الشقي', thumbnail: 'assets/images/v6.jpg', duration: '06:40', category: 'قصص',    timeAgo: 'قبل ٥ ساعات',      views: '٢٣٠ مشاهدة'      },
  ];

  filteredVideos = this.allVideos;

  onCategoryChange(category: string) {
    this.filteredVideos = category === 'الكل'
      ? this.allVideos
      : this.allVideos.filter(v => v.category === category);
  }
}
