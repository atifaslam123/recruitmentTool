import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantprofileComponent } from './applicantprofile.component';

describe('TestpageComponent', () => {
  let component: ApplicantprofileComponent;
  let fixture: ComponentFixture<ApplicantprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
