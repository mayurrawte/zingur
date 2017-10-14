import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalvisitorComponent } from './localvisitor.component';

describe('LocalvisitorComponent', () => {
  let component: LocalvisitorComponent;
  let fixture: ComponentFixture<LocalvisitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalvisitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalvisitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
