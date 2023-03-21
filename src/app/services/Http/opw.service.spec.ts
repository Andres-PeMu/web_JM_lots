import { TestBed } from '@angular/core/testing';

import { OpwService } from './opw.service';

describe('OpwService', () => {
  let service: OpwService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpwService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
