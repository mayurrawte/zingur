import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../data.service';
import {FormControl, FormGroup} from '@angular/forms';
import {VisitorsService} from "../visitors.service";
@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.component.html',
  styleUrls: ['./visitors.component.css']
})
export class VisitorsComponent implements OnInit {
  constructor(
    private CRoute: ActivatedRoute,
    private dataService: DataService,
    public visitorsService: VisitorsService,
    private router: Router) {}

  ngOnInit() {
    this.CRoute.params.subscribe((data) => {
      console.log(data['quizid']);
      this.visitorsService.quizId = data['quizid'];
    });
    this.dataService.getUserDataById(this.visitorsService.quizId)
      .then((data) => {
        console.log(data['quiz']);
        this.visitorsService.recData = data;
        this.visitorsService.challengingUser = data;
        this.visitorsService.Questions = data['quiz'];
        this.visitorsService.loaded = true;
        console.log(data);
        if (data['verified'] === true) {
          this.router.navigate(['visitor', this.visitorsService.quizId, 'social']);
        } else {
          this.router.navigate(['visitor', this.visitorsService.quizId, 'local'])
        }
      });
  }
}
