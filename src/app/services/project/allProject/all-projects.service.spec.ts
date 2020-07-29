import { TestBed } from '@angular/core/testing';

import { AllProjectsService } from './all-projects.service';

describe('AllProjectsService', () => {
  let service: AllProjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllProjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
