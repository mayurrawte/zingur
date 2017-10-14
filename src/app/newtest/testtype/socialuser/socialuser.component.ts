import { Component, OnInit } from '@angular/core';
import {DataService} from "../../../data.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-socialuser',
  templateUrl: './socialuser.component.html',
  styleUrls: ['./socialuser.component.css']
})
export class SocialuserComponent implements OnInit {
  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
  }
  onSignIn(provider: string) {
    this.dataService.loading = true;
    this.dataService.socialLogin(provider, 'requester')
      .then(() => {
        console.log('loggedin');
        this.dataService.loading = false;
        this.router.navigate(['new-test', 'quiz']);
      });
  }

}
