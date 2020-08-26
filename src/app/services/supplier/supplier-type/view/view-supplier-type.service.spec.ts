import { TestBed } from '@angular/core/testing';

import { ViewSupplierTypeService } from './view-supplier-type.service';

describe('ViewSupplierTypeService', () => {
  let service: ViewSupplierTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewSupplierTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
