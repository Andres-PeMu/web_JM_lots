import { TestBed } from '@angular/core/testing';

import { OpeExpensesService } from './ope-expenses.service';

describe('OpeExpensesService', () => {
  let service: OpeExpensesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpeExpensesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
