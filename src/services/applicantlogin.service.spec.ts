import { TestBed } from '@angular/core/testing';

import { ApplicantloginService } from './applicantlogin.service';

describe('ApplicantloginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApplicantloginService = TestBed.get(ApplicantloginService);
    expect(service).toBeTruthy();
  });
});
