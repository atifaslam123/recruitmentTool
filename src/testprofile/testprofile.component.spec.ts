import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestprofileComponent } from './testprofile.component';

describe('TestprofileComponent', () => {
  let component: TestprofileComponent;
  let fixture: ComponentFixture<TestprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
