import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthuserprofileComponent } from './authuserprofile.component';

describe('AuthuserprofileComponent', () => {
  let component: AuthuserprofileComponent;
  let fixture: ComponentFixture<AuthuserprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthuserprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthuserprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
