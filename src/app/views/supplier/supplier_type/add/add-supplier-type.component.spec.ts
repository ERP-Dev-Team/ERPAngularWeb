import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSupplierTypeComponent } from './add-supplier-type.component';

describe('AddSupplierTypeComponent', () => {
  let component: AddSupplierTypeComponent;
  let fixture: ComponentFixture<AddSupplierTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSupplierTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSupplierTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
