import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoLibrary } from './video-library';

describe('VideoLibrary', () => {
  let component: VideoLibrary;
  let fixture: ComponentFixture<VideoLibrary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoLibrary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoLibrary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
