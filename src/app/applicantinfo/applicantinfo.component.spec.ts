import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantinfoComponent } from './applicantinfo.component';

describe('ApplicantinfoComponent', () => {
  let component: ApplicantinfoComponent;
  let fixture: ComponentFixture<ApplicantinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
