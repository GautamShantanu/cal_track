import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CategorisedSearchComponent} from './categorised-search.component';

describe('SearchComponent', () => {
  let component: CategorisedSearchComponent;
  let fixture: ComponentFixture<CategorisedSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CategorisedSearchComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorisedSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
