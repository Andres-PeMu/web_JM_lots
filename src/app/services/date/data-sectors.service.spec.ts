import { TestBed } from '@angular/core/testing';

import { DataSectorsService } from './data-sectors.service';

describe('DataSectorsService', () => {
  let service: DataSectorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataSectorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
