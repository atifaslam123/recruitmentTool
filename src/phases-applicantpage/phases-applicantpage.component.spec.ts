import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhasesApplicantpageComponent } from './phases-applicantpage.component';

describe('PhasesApplicantpageComponent', () => {
  let component: PhasesApplicantpageComponent;
  let fixture: ComponentFixture<PhasesApplicantpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhasesApplicantpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhasesApplicantpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
