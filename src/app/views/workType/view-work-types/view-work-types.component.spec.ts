import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWorkTypesComponent } from './view-work-types.component';

describe('ViewWorkTypesComponent', () => {
  let component: ViewWorkTypesComponent;
  let fixture: ComponentFixture<ViewWorkTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewWorkTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewWorkTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
