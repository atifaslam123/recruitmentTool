import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionprofileComponent } from './questionprofile.component';

describe('QuestionprofileComponent', () => {
  let component: QuestionprofileComponent;
  let fixture: ComponentFixture<QuestionprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
