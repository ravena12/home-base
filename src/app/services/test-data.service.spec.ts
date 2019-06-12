import { TestBed } from '@angular/core/testing';

import { TestDataAccessService} from './test-data.service';

describe('TestDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestDataAccessService = TestBed.get(TestDataAccessService);
    expect(service).toBeTruthy();
  });
});
