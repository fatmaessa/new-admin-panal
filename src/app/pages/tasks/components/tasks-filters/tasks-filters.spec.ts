import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksFilters } from './tasks-filters';

describe('TasksFilters', () => {
  let component: TasksFilters;
  let fixture: ComponentFixture<TasksFilters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksFilters]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksFilters);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
