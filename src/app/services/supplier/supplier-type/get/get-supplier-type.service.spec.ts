import { TestBed } from '@angular/core/testing';

import { GetSupplierTypeService } from './get-supplier-type.service';

describe('GetSupplierTypeService', () => {
  let service: GetSupplierTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetSupplierTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
