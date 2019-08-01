import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserpageComponent } from './edit-userpage.component';

describe('EditUserpageComponent', () => {
  let component: EditUserpageComponent;
  let fixture: ComponentFixture<EditUserpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUserpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
