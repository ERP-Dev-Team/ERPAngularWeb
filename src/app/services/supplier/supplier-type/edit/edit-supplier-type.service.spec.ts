import { TestBed } from '@angular/core/testing';

import { EditSupplierTypeService } from './edit-supplier-type.service';

describe('EditSupplierTypeService', () => {
  let service: EditSupplierTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditSupplierTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
