import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {DataService} from "../data.service";
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "angular2-social-login";

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
  visitingUser = {};
  quizCompleted = false;
  score = 0;
  @ViewChild('responderName') RName: ElementRef;
  constructor(private CRoute: ActivatedRoute, private dataService: DataService, private authService: AuthService) {
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
        correctAnswer.innerHTML = correctAnswer.innerHTML + '<li class="list-group-item">' + this.Questions[i].question + '</p> Ans:' + this.Questions[i].option[this.Questions[i].answer] + '</li>';
      } else {
        wrongAnswer.innerHTML = wrongAnswer.innerHTML + '<li class="list-group-item">' + this.Questions[i].question + '</p> Ans:' + this.Questions[i].option[this.Questions[i].answer] + '</li>';
      }
    }
    this.QuizAnswers['score'] = this.score;
    this.dataService.setRespondersResult(this.QuizAnswers, this.quizId);
  }

  onSignIn(provider: string) {
    this.authService.login(provider).subscribe((resData) => {
      this.visitingUser = resData;
      console.log(resData);
      const data = {
        'name': this.visitingUser['name'],
        'email': resData['email'],
        'verified': true,
        'thumb': resData['image']
      };
      this.dataService.setResponderDetail(data);
      this.initial = false;
    }, (error: Response) => {
      console.log(error);
    });
  }
  onSubmitName() {
    const data = {
      'name' : this.RName.nativeElement.value,
      'email': null,
      'verified': false,
      'thumb' : 'default'
    };
    this.dataService.setResponderDetail(data);
    this.initial = false;
  }
}
