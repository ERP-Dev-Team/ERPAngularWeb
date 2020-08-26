import { TestBed } from '@angular/core/testing';

import { ViewUnitService } from './view-unit.service';

describe('ViewUnitService', () => {
  let service: ViewUnitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewUnitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
