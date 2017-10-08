import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from 'angular2-social-login';
import {Response} from '@angular/http';
import {Router} from '@angular/router';
import {DataService} from "../../data.service";

@Component({
  selector: 'app-testtype',
  templateUrl: './testtype.component.html',
  styleUrls: ['./testtype.component.css']
})
export class TesttypeComponent implements OnInit {

  testType: string = null;
  enteredInitDetail = false;
  userName = null;
  @ViewChild('username') NameRef: ElementRef;
  @ViewChild('email') EmailRef: ElementRef;
  constructor(private authService: AuthService, private router: Router, private dataService: DataService) { }
  ngOnInit() {
  }
  selectTestType(testType: string) {
    this.testType = testType;
  }
  onSignIn(provider: string) {
    this.authService.login(provider).subscribe((resData) => {
      this.userName = resData['name'];
      console.log(resData);
      const data = {
        'name' : this.userName,
        'email': resData['email'],
        'verified': true,
        'thumb' : resData['image']
      };
      this.dataService.setUserDetail(data);
      this.router.navigate(['new-test', 'quiz', 0]);
    }, (error: Response) => {
      console.log(error);
    });
  }
  onSubmitName() {
    if (this.NameRef.nativeElement.valid && this.EmailRef.nativeElement.valid) {
      this.userName = this.NameRef.nativeElement.value;
      console.log(this.userName);
      const data = {
        'name' : this.userName,
        'email': this.EmailRef.nativeElement.value,
        'verified': false,
        'thumb' : 'default'
      };
      this.dataService.setUserDetail(data);
      this.router.navigate(['new-test', 'quiz', 0]);
    } else {
      alert('Invalid Details');
  }
}
}
