import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosFilters } from './videos-filters';

describe('VideosFilters', () => {
  let component: VideosFilters;
  let fixture: ComponentFixture<VideosFilters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideosFilters]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideosFilters);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
