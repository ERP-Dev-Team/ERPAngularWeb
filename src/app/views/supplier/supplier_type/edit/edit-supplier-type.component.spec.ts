import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSupplierTypeComponent } from './edit-supplier-type.component';

describe('EditSupplierTypeComponent', () => {
  let component: EditSupplierTypeComponent;
  let fixture: ComponentFixture<EditSupplierTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSupplierTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSupplierTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
