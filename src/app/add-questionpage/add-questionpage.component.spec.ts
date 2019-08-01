import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuestionpageComponent } from './add-questionpage.component';

describe('AddQuestionpageComponent', () => {
  let component: AddQuestionpageComponent;
  let fixture: ComponentFixture<AddQuestionpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddQuestionpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddQuestionpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
