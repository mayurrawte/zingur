import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocaluserComponent } from './localuser.component';

describe('LocaluserComponent', () => {
  let component: LocaluserComponent;
  let fixture: ComponentFixture<LocaluserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocaluserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocaluserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
