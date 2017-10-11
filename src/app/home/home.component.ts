import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor(private router: Router) { }
  ngOnInit() {
  }
  ngAfterViewInit() {
    console.log('view init');
  }
  onNewTest() {
    this.router.navigate(['new-test']);
  }
}
