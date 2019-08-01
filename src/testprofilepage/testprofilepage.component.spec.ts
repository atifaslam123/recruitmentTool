import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestprofilepageComponent } from './testprofilepage.component';

describe('TestprofilepageComponent', () => {
  let component: TestprofilepageComponent;
  let fixture: ComponentFixture<TestprofilepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestprofilepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestprofilepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
