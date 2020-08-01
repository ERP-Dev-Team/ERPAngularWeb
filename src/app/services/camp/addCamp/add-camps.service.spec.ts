import { TestBed } from '@angular/core/testing';

import { AddCampsService } from './add-camps.service';

describe('AddCampsService', () => {
  let service: AddCampsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddCampsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
