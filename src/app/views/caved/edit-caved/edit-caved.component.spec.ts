import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCavedComponent } from './edit-caved.component';

describe('EditCavedComponent', () => {
  let component: EditCavedComponent;
  let fixture: ComponentFixture<EditCavedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCavedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCavedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
