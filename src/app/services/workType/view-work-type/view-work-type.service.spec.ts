import { TestBed } from '@angular/core/testing';

import { ViewWorkTypeService } from './view-work-type.service';

describe('ViewWorkTypeService', () => {
  let service: ViewWorkTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewWorkTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
