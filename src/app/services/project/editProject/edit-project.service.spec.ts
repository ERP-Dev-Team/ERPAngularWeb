import { TestBed } from '@angular/core/testing';

import { EditProjectService } from './edit-project.service';

describe('EditProjectService', () => {
  let service: EditProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
