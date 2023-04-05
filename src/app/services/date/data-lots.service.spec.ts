import { TestBed } from '@angular/core/testing';

import { DataLotsService } from './data-lots.service';

describe('DataLotsService', () => {
  let service: DataLotsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataLotsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
