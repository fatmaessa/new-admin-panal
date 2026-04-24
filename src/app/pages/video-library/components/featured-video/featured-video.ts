import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface FeaturedVideo {
  title: string;
  description: string;
  thumbnail: string;
}

@Component({
   selector: 'app-featured-video',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './featured-video.html',
    styleUrl: './featured-video.scss',

})
export class FeaturedVideoComponent {
  @Input() video: FeaturedVideo = {
    title: 'رحلة ممتعة في عالم الأرقام',
    description: 'تعلم العد بطريقة تفاعلية مع أصدقائك في ونيسي. درس مشوق ومرح للأبطال الصغار.',
    thumbnail: 'assets/images/featured.jpg'
  };
}
