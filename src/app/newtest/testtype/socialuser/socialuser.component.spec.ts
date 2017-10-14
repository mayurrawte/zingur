import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialuserComponent } from './socialuser.component';

describe('SocialuserComponent', () => {
  let component: SocialuserComponent;
  let fixture: ComponentFixture<SocialuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
