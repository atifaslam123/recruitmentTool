import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddApplicantpageComponent } from './add-applicantpage.component';

describe('AddApplicantpageComponent', () => {
  let component: AddApplicantpageComponent;
  let fixture: ComponentFixture<AddApplicantpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddApplicantpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddApplicantpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
