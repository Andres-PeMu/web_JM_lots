import { TestBed } from '@angular/core/testing';

import { InvoiceGopService } from './invoice-gop.service';

describe('InvoiceGopService', () => {
  let service: InvoiceGopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoiceGopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
