import { Component, OnInit } from '@angular/core';
import {DataService} from '../../data.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-socialvisitor',
  templateUrl: './socialvisitor.component.html',
  styleUrls: ['./socialvisitor.component.css']
})
export class SocialvisitorComponent implements OnInit {

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
  }
  onSignIn(provider: string) {
    this.dataService.socialLogin(provider, 'responder')
      .then(() => {
        this.router.navigate(['visitor', 'quiz']);
      });
  }
}
