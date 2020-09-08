import { TestBed } from '@angular/core/testing';

import { AllRequisitionsService } from './all-requisitions.service';

describe('AllRequisitionsService', () => {
  let service: AllRequisitionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllRequisitionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
