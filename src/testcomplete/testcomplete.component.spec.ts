import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestcompleteComponent } from './testcomplete.component';

describe('TestcompleteComponent', () => {
  let component: TestcompleteComponent;
  let fixture: ComponentFixture<TestcompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestcompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestcompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
