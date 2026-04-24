
import Swal from 'sweetalert2';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { STORY, StoryType } from '../../models/models';
import { RouterLink } from "@angular/router";
import { Sorties } from '../../services/sorties';

@Component({
  selector: 'app-stories',
  imports: [RouterLink],
  templateUrl: './stories.html',
  styleUrl: './stories.scss',
})
export class Stories implements OnInit {
  private storyService=inject(Sorties)
  ngOnInit(): void {
this.getAllStories()  }

allStories = signal<STORY[]>([])

getAllStories() {
  this.storyService.getAllStories().subscribe((res: any) => {
    this.allStories.set(res.data); 
  });
}
  selectedFilter = signal<string>('الكل');

 filteredStories = computed(() => {
  const filter = this.selectedFilter();
  if (filter === 'الكل') {
    return this.allStories();
  }
  return this.allStories().filter(story => story.category === filter);
});

  onFilters(type: string) {
    this.selectedFilter.set(type);
  }

 deleteStory(id: number | undefined) {
  Swal.fire({
    title: 'هل أنت متأكد؟',
    text: "لن تتمكن من التراجع عن هذا الإجراء!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#7c3aed', 
    cancelButtonColor: '#94a3b8',
    confirmButtonText: 'نعم، احذفها!',
    cancelButtonText: 'إلغاء',
    reverseButtons: true 
  }).then((result) => {
    if (result.isConfirmed) {
      this.allStories.update(stories => stories.filter(s => s.storyId !== id));

      Swal.fire({
        title: 'تم الحذف!',
        text: 'تم حذف القصة بنجاح.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });
    }
  });
 }}
