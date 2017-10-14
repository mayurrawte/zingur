import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../../data.service';
import {Router} from "@angular/router";
import {VisitorsService} from "../../visitors.service";

@Component({
  selector: 'app-localvisitor',
  templateUrl: './localvisitor.component.html',
  styleUrls: ['./localvisitor.component.css']
})
export class LocalvisitorComponent implements OnInit {

  @ViewChild('responderName') RName: ElementRef;
  constructor(private dataService: DataService, private router: Router, private visitorService: VisitorsService) { }

  ngOnInit() {
  }
  onSubmitName() {
    const data = {'name' : this.RName.nativeElement.value, 'email': null};
    this.dataService.localLogin(data, 'responder');
    this.router.navigate(['visitor', this.visitorService.quizId, 'quiz']);
  }

}
