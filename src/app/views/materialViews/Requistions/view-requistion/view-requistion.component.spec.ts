import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRequistionComponent } from './view-requistion.component';

describe('ViewRequistionComponent', () => {
  let component: ViewRequistionComponent;
  let fixture: ComponentFixture<ViewRequistionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewRequistionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRequistionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
