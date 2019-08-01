import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAnswerpageComponent } from './edit-answerpage.component';

describe('EditAnswerpageComponent', () => {
  let component: EditAnswerpageComponent;
  let fixture: ComponentFixture<EditAnswerpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAnswerpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAnswerpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
