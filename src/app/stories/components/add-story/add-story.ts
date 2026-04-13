import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StoryType, STORY, NEWSTORY } from '../../models/models'; 
import { CommonModule } from '@angular/common';
import { Sorties } from '../../services/sorties';

@Component({
  selector: 'app-add-story',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './add-story.html',
  styleUrl: './add-story.scss',
})
export class AddStory implements OnInit {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private toast = inject(ToastrService);
  private route = inject(ActivatedRoute);
  private storyService = inject(Sorties); // حقن السيرفس

  typeLookUps = signal<string[]>(Object.values(StoryType));
  form!: FormGroup;
  isEditMode = signal<boolean>(false);
  storyId: string | null = null;

  ngOnInit(): void {
    this.initForm();
    this.storyId = this.route.snapshot.paramMap.get('id');
    
    if (this.storyId) {
      this.isEditMode.set(true);
      this.loadStoryData(Number(this.storyId));
    }
  }

  initForm() {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      category: ['', [Validators.required]],
      storyText: ['', [Validators.required]], 
      audioUrl: ['', [Validators.required]],
      url: ['', [Validators.required]], 
      pointsRewarded: [0, [Validators.required, Validators.min(1)]]
    });
  }

  loadStoryData(id: number) {
   
    this.storyService.getAllStories().subscribe((res: any) => {
      const story = res.data.find((s: STORY) => s.storyId === id);
      if (story) this.form.patchValue(story);
    });
  }

 // add-story.component.ts

onSubmit() {
  if (this.form.valid) {
    const storyData: NEWSTORY = this.form.value;

    if (this.isEditMode()) {
      const id = Number(this.storyId); 
      
      this.storyService.updateStory(id, storyData).subscribe({
        next: (res) => {
          this.toast.success('تم تحديث القصة بنجاح');
          this.router.navigate(['/stories']);
        },
        error: (err) => {
          this.toast.error('حدث خطأ أثناء التحديث');
          console.error(err);
        }
      });

    } else {
      // إضافة قصة جديدة
      this.storyService.addNewStories(storyData).subscribe({
        next: (res) => {
          this.toast.success('تمت إضافة القصة بنجاح!');
          this.router.navigate(['/stories']);
        },
        error: (err) => this.toast.error('فشل في الإضافة')
      });
    }
  } else {
    this.form.markAllAsTouched();
    this.toast.error('يرجى ملء الحقول المطلوبة');
  }
}

  onCancel() {
    this.router.navigate(['/stories']); 
  }
}