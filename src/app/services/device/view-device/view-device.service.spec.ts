import { TestBed } from '@angular/core/testing';

import { ViewDeviceService } from './view-device.service';

describe('ViewDeviceService', () => {
  let service: ViewDeviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewDeviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
