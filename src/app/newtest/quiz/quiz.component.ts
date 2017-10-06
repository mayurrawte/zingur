import { Component, OnInit } from '@angular/core';
import {DataService} from '../../data.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  Questions = null;
  maxtest = 15;
  id = null;
  editMode = false;
  loaded = false;
  tempquiz = [];
  tempForm: FormGroup;
  answerForm: FormGroup;
  constructor(private dataService: DataService, private router: Router, private CRoute: ActivatedRoute) { }
  ngOnInit() {
    this.Questions = this.dataService.getQuestions();
    this.id = this.CRoute.snapshot.params['id'];
    this.loaded = true;
    this.updateFormGroup();
    console.log(this.answerForm);
  }
  updateFormGroup() {
    this.tempForm = new FormGroup({
      'option1' : new FormControl(this.Questions[this.id].options[0]),
      'option2' : new FormControl(this.Questions[this.id].options[1]),
      'option3' : new FormControl(this.Questions[this.id].options[2]),
      'option4' : new FormControl(this.Questions[this.id].options[3]),
    });
    this.answerForm = new FormGroup({
      'answer': new FormControl(null)
    });
  }
  goToNextQuestion(id: number) {
    this.updateTempQuiz();
    const nextId = +this.id + 1;
    if (this.maxtest > nextId) {
      this.id = nextId;
    } else {
      this.finishedCreatingTest();
    }
    this.updateFormGroup();
  }
  updateTempQuiz() {
    const question = this.Questions[this.id].question;
    const options = this.Questions[this.id].options;
    const ans = this.answerForm.value['answer'];
    const q = {
      'question' : question,
      'option' : options,
      'answer' : ans
    };
    this.tempquiz.push(q);
    console.log(this.tempquiz);
  }
  onToggleMode() {
    this.editMode = !this.editMode;
    console.log(this.answerForm);
    console.log(this.tempForm.value);
    this.Questions[this.id].options[0] = this.tempForm.value['option1'];
    this.Questions[this.id].options[1] = this.tempForm.value['option2'];
    this.Questions[this.id].options[2] = this.tempForm.value['option3'];
    this.Questions[this.id].options[3] = this.tempForm.value['option4'];
  }
  finishedCreatingTest() {
    this.dataService.setQuiz(this.tempquiz)
      .then((data) => {
      console.log(data);
      this.router.navigate(['new-test', 'share'], {queryParams: {id: data}});
});
}
}
