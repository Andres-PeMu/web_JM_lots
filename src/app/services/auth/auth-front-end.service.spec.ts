import { TestBed } from '@angular/core/testing';

import { AuthFrontEndService } from './auth-front-end.service';

describe('AuthFrontEndService', () => {
  let service: AuthFrontEndService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthFrontEndService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
