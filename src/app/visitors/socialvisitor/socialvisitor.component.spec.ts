import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialvisitorComponent } from './socialvisitor.component';

describe('SocialvisitorComponent', () => {
  let component: SocialvisitorComponent;
  let fixture: ComponentFixture<SocialvisitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialvisitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialvisitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
