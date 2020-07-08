import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCampComponent } from './edit-camp.component';

describe('EditCampComponent', () => {
  let component: EditCampComponent;
  let fixture: ComponentFixture<EditCampComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCampComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
