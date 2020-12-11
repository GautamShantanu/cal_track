import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayCalorieDataComponent } from './day-calorie-data.component';

describe('DayCalorieDataComponent', () => {
  let component: DayCalorieDataComponent;
  let fixture: ComponentFixture<DayCalorieDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayCalorieDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayCalorieDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
