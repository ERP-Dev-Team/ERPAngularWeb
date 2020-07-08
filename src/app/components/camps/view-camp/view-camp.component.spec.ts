import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCampComponent } from './view-camp.component';

describe('ViewCampComponent', () => {
  let component: ViewCampComponent;
  let fixture: ComponentFixture<ViewCampComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCampComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
