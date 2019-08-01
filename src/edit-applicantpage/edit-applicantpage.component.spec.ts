import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditApplicantpageComponent } from './edit-applicantpage.component';

describe('EditApplicantpageComponent', () => {
  let component: EditApplicantpageComponent;
  let fixture: ComponentFixture<EditApplicantpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditApplicantpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditApplicantpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
