import { TestBed } from '@angular/core/testing';

import { AddSupplierTypeService } from './add-supplier-type.service';

describe('AddSupplierTypeService', () => {
  let service: AddSupplierTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddSupplierTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
