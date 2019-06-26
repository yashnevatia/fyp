import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutDetailsPage } from './workout-details.page';

describe('WorkoutDetailsPage', () => {
  let component: WorkoutDetailsPage;
  let fixture: ComponentFixture<WorkoutDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkoutDetailsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
