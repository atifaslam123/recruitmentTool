import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserpageComponent } from './add-userpage.component';

describe('AddUserpageComponent', () => {
  let component: AddUserpageComponent;
  let fixture: ComponentFixture<AddUserpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
