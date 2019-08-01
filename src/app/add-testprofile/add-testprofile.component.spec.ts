import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTestprofileComponent } from './add-testprofile.component';

describe('AddTestprofileComponent', () => {
  let component: AddTestprofileComponent;
  let fixture: ComponentFixture<AddTestprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTestprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTestprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
