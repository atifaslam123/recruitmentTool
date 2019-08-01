import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdcardfooterComponent } from './sdcardfooter.component';

describe('SdcardfooterComponent', () => {
  let component: SdcardfooterComponent;
  let fixture: ComponentFixture<SdcardfooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdcardfooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdcardfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
