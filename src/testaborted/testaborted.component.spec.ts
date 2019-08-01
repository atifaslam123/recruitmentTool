import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestabortedComponent } from './testaborted.component';

describe('TestabortedComponent', () => {
  let component: TestabortedComponent;
  let fixture: ComponentFixture<TestabortedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestabortedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestabortedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
