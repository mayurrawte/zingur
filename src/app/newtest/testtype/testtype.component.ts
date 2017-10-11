import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../../data.service';

@Component({
  selector: 'app-testtype',
  templateUrl: './testtype.component.html',
  styleUrls: ['./testtype.component.css']
})
export class TesttypeComponent implements OnInit {

  testType: string = null;
  userName = null;
  @ViewChild('username') NameRef: ElementRef;
  @ViewChild('email') EmailRef: ElementRef;
  constructor(private router: Router, private dataService: DataService) { }
  ngOnInit() {
  }
  selectTestType(testType: string) {
    this.testType = testType;
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
  onSubmitName() {
    if (this.NameRef.nativeElement.validity.valid && this.EmailRef.nativeElement.validity.valid) {
      this.dataService.loading = true;
      const localData = {'name' : this.NameRef.nativeElement.value, 'email': this.EmailRef.nativeElement.value};
      this.dataService.localLogin(localData, 'requester');
      this.router.navigate(['new-test', 'quiz'])
        .then(() => {
        this.dataService.loading = false;
        });
    } else {
      alert('Invalid Details');
  }
}
}
