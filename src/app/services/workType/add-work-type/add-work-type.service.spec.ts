import { TestBed } from '@angular/core/testing';

import { AddWorkTypeService } from './add-work-type.service';

describe('AddWorkTypeService', () => {
  let service: AddWorkTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddWorkTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
