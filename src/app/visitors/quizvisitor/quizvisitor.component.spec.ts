import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizvisitorComponent } from './quizvisitor.component';

describe('QuizvisitorComponent', () => {
  let component: QuizvisitorComponent;
  let fixture: ComponentFixture<QuizvisitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizvisitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizvisitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
