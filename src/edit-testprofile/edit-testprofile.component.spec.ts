import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTestprofileComponent } from './edit-testprofile.component';

describe('EditTestprofileComponent', () => {
  let component: EditTestprofileComponent;
  let fixture: ComponentFixture<EditTestprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTestprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTestprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
