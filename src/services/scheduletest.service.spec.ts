import { TestBed } from '@angular/core/testing';

import { ScheduletestService } from './scheduletest.service';

describe('ScheduletestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScheduletestService = TestBed.get(ScheduletestService);
    expect(service).toBeTruthy();
  });
});
