import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCalorieDataComponent } from './add-calorie-data.component';

describe('AddCalorieDataComponent', () => {
  let component: AddCalorieDataComponent;
  let fixture: ComponentFixture<AddCalorieDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCalorieDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCalorieDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
