import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosTable } from './videos-table';

describe('VideosTable', () => {
  let component: VideosTable;
  let fixture: ComponentFixture<VideosTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideosTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideosTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
