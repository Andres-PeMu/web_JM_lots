import { TestBed } from '@angular/core/testing';

import { DataOEService } from './data-oe.service';

describe('DataOEService', () => {
  let service: DataOEService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataOEService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
