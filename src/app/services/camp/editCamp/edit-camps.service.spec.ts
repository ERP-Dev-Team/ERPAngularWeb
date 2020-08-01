import { TestBed } from '@angular/core/testing';

import { EditCampsService } from './edit-camps.service';

describe('EditCampsService', () => {
  let service: EditCampsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditCampsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
