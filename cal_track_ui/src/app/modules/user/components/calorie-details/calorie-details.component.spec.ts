import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalorieDetailsComponent } from './calorie-details.component';

describe('CalorieDetailsComponent', () => {
  let component: CalorieDetailsComponent;
  let fixture: ComponentFixture<CalorieDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalorieDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalorieDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
