import { TestBed } from '@angular/core/testing';

import { DataChargesService } from './data-charges.service';

describe('DataChargesService', () => {
  let service: DataChargesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataChargesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
