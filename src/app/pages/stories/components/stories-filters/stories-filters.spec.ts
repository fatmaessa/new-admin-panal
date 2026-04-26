import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoriesFilters } from './stories-filters';

describe('StoriesFilters', () => {
  let component: StoriesFilters;
  let fixture: ComponentFixture<StoriesFilters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoriesFilters]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoriesFilters);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
