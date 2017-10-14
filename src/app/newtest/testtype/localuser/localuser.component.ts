import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../../../data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-localuser',
  templateUrl: './localuser.component.html',
  styleUrls: ['./localuser.component.css']
})
export class LocaluserComponent implements OnInit {
  userName = null;
  @ViewChild('username') NameRef: ElementRef;
  @ViewChild('email') EmailRef: ElementRef;
  constructor(private dataService: DataService, private router: Router) { }
  ngOnInit() {
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
