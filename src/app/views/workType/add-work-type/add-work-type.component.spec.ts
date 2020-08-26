import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorkTypeComponent } from './add-work-type.component';

describe('AddWorkTypeComponent', () => {
  let component: AddWorkTypeComponent;
  let fixture: ComponentFixture<AddWorkTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWorkTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWorkTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
