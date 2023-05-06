import { TestBed } from '@angular/core/testing';

import { DataInvoiseService } from './data-invoise.service';

describe('DataInvoiseService', () => {
  let service: DataInvoiseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataInvoiseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
