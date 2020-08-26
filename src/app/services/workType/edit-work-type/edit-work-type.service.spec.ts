import { TestBed } from '@angular/core/testing';

import { EditWorkTypeService } from './edit-work-type.service';

describe('EditWorkTypeService', () => {
  let service: EditWorkTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditWorkTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
