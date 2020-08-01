import { TestBed } from '@angular/core/testing';

import { AllCampsService } from './all-camps.service';

describe('AllCampsService', () => {
  let service: AllCampsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllCampsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
