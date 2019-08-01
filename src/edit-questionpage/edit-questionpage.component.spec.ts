import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQuestionpageComponent } from './edit-questionpage.component';

describe('EditQuestionpageComponent', () => {
  let component: EditQuestionpageComponent;
  let fixture: ComponentFixture<EditQuestionpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditQuestionpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditQuestionpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
