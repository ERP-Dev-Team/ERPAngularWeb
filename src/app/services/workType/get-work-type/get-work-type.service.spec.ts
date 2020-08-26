import { TestBed } from '@angular/core/testing';

import { GetWorkTypeService } from './get-work-type.service';

describe('GetWorkTypeService', () => {
  let service: GetWorkTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetWorkTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
