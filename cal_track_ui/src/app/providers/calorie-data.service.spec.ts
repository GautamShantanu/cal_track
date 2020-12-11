import { TestBed } from '@angular/core/testing';

import { CalorieDataService } from './calorie-data.service';

describe('CalorieDataService', () => {
  let service: CalorieDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalorieDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
