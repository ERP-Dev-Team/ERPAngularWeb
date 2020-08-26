import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWorkTypeComponent } from './edit-work-type.component';

describe('EditWorkTypeComponent', () => {
  let component: EditWorkTypeComponent;
  let fixture: ComponentFixture<EditWorkTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditWorkTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWorkTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
