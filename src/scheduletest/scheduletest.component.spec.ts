import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduletestComponent } from './scheduletest.component';

describe('ScheduletestComponent', () => {
  let component: ScheduletestComponent;
  let fixture: ComponentFixture<ScheduletestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduletestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduletestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
