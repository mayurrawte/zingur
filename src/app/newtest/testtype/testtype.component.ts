import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../../data.service';

@Component({
  selector: 'app-testtype',
  templateUrl: './testtype.component.html',
  styleUrls: ['./testtype.component.css']
})
export class TesttypeComponent implements OnInit {
  constructor(private router: Router) { }
  ngOnInit() {
  }
  selectTestType(testType: string) {
    this.router.navigate(['new-test', testType]);
  }
}
