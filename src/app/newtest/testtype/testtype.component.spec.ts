import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TesttypeComponent } from './testtype.component';

describe('TesttypeComponent', () => {
  let component: TesttypeComponent;
  let fixture: ComponentFixture<TesttypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TesttypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TesttypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
