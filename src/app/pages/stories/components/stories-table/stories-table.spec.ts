import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoriesTable } from './stories-table';

describe('StoriesTable', () => {
  let component: StoriesTable;
  let fixture: ComponentFixture<StoriesTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoriesTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoriesTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
