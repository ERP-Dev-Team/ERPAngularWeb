import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSupplierTypeComponent } from './view-supplier-type.component';

describe('ViewSupplierTypeComponent', () => {
  let component: ViewSupplierTypeComponent;
  let fixture: ComponentFixture<ViewSupplierTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSupplierTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSupplierTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
