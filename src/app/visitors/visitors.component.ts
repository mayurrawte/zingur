import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../data.service';
import {FormControl, FormGroup} from '@angular/forms';
@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.component.html',
  styleUrls: ['./visitors.component.css']
})
export class VisitorsComponent implements OnInit {
  quizId = null;
  initial = true;
  Questions = [];
  loaded = false;
  maxtest = 14;
  id = 0;
  tempForm: FormGroup;
  answerForm: FormGroup;
  QuizAnswers = [];
  challengingUser = null;
  quizCompleted = false;
  score = 0;
  @ViewChild('responderName') RName: ElementRef;
  constructor(private CRoute: ActivatedRoute, private dataService: DataService) {
  }

  ngOnInit() {
    this.CRoute.params.subscribe((data) => {
      console.log(data['quizid']);
      this.quizId = data['quizid'];
    });
    this.dataService.getUserDataById(this.quizId)
      .then((data) => {
        console.log(data['quiz']);
        this.challengingUser = data;
        this.Questions = data['quiz'];
        console.log(this.Questions);
        this.updateFormGroup();
        this.loaded = true;
      });
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
      alert('result');
      this.quizCompleted = true;
      setTimeout(() => {
        this.generateResult();
      }, 2000);
    }
    this.answerForm.reset();
    this.updateFormGroup();
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
    const data = {'answers': this.QuizAnswers, 'score': this.score};
    this.dataService.setRespondersResult(data, this.quizId);
  }
  onSignIn(provider: string) {
    this.dataService.socialLogin(provider, 'responder')
      .then(() => {
      this.initial = false;
      });
  }
  onSubmitName() {
    const data = {'name' : this.RName.nativeElement.value, 'email': null};
    this.dataService.localLogin(data, 'responder');
    this.initial = false;
  }
}
