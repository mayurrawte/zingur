import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {VisitorsService} from '../../visitors.service';
import {DataService} from '../../data.service';

@Component({
  selector: 'app-quizvisitor',
  templateUrl: './quizvisitor.component.html',
  styleUrls: ['./quizvisitor.component.css']
})
export class QuizvisitorComponent implements OnInit {
  tempForm: FormGroup;
  answerForm: FormGroup;
  QuizAnswers = [];
  quizCompleted = false;
  score = 0;
  promote = false;
  showFewWordsBox = false;
  fewWordsByResponder = '';
  fewWordsForm: FormGroup;
  loaded = false;
  maxtest = 14;
  id = 0;
  quizId = null;
  Questions = [];
  challengingUser = null;
  constructor(private visitorsService: VisitorsService, private dataService: DataService) { }
  ngOnInit() {
    this.Questions = this.visitorsService.Questions;
    this.loaded = this.visitorsService.loaded;
    this.challengingUser = this.visitorsService.challengingUser;
    this.fewWordsForm = new FormGroup({
      'fewWords' : new FormControl('You are awesome !')
    });
    this.quizId = this.visitorsService.quizId;
    this.updateFormGroup();
  }
  updateFormGroup() {
    this.answerForm = new FormGroup({
      'answer': new FormControl(null)
    });
    this.tempForm = new FormGroup({
      'option1': new FormControl(this.Questions[this.id].option[0]),
      'option2': new FormControl(this.Questions[this.id].option[1]),
      'option3': new FormControl(this.Questions[this.id].option[2]),
      'option4': new FormControl(this.Questions[this.id].option[3]),
    });
    console.log('updateing');
  }

  goToNextQuestion() {
    if (this.maxtest > this.id) {
      this.id = this.id + 1;
      this.updateTempQuizAnswers();
    } else {
      this.updateTempQuizAnswers();
      this.fewWordsBox();
    }
    this.answerForm.reset();
    this.updateFormGroup();
  }
  fewWordsBox() {
    this.showFewWordsBox = true;
    console.log(this.fewWordsForm);
  }
  completeQuiz() {
    this.fewWordsByResponder = this.fewWordsForm.value.fewWords;
    this.quizCompleted = true;
    setTimeout(() => {
      this.generateResult();
    }, 2000);
  }
  updateTempQuizAnswers() {
    const ans = this.answerForm.value['answer'];
    this.QuizAnswers.push(ans);
    console.log(this.QuizAnswers);
  }

  generateResult() {
    const correctAnswer = document.getElementById('correctAnsUl');
    const wrongAnswer = document.getElementById('wrongAnsUl');
    for (let i = 0; i < 15; i++) {
      if (this.Questions[i].answer === this.QuizAnswers[i]) {
        this.score = this.score + 1;
        correctAnswer.innerHTML = correctAnswer.innerHTML +
          '<li class="list-group-item">' +
          this.Questions[i].question +
          '</p> Ans:' + this.Questions[i].option[this.Questions[i].answer] +
          '</li>';
      } else {
        wrongAnswer.innerHTML = wrongAnswer.innerHTML +
          '<li class="list-group-item">' +
          this.Questions[i].question +
          '</p> Ans:' + this.Questions[i].option[this.Questions[i].answer] +
          '</li>';
      }
    }
    const data = {'answers': this.QuizAnswers, 'score': this.score, 'fewWords': this.fewWordsByResponder};
    console.log(data);
    this.dataService.setRespondersResult(data, this.quizId);
    setTimeout(() => {
      this.promote = true;
    }, 4000);
  }

}
