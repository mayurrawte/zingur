import { Component, OnInit } from '@angular/core';
import {AuthService} from 'angular2-social-login';

@Component({
  selector: 'app-newtest',
  templateUrl: './newtest.component.html',
  styleUrls: ['./newtest.component.css']
})
export class NewtestComponent implements OnInit {
  constructor(private authService: AuthService) { }
  ngOnInit() {
  }
}
