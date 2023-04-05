import { TestBed } from '@angular/core/testing';

import { SalesChargesCustomersService } from './sales-charges-customers.service';

describe('SalesChargesCustomersService', () => {
  let service: SalesChargesCustomersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesChargesCustomersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
