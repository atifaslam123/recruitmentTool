import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantloginComponent } from './applicantlogin.component';

describe('ApplicantloginComponent', () => {
  let component: ApplicantloginComponent;
  let fixture: ComponentFixture<ApplicantloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
