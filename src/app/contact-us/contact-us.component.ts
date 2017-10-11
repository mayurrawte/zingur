import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DataService} from "../data.service";

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  contactForm: FormGroup;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.contactForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.email, Validators.required]),
      'message': new FormControl(null, [Validators.required])
    });
  }
  onSendMail() {
    console.log(this.contactForm);
    if (this.contactForm.valid) {
      this.dataService.contactUsEmail(this.contactForm.value.name, this.contactForm.value.email, this.contactForm.value.message);
      this.contactForm.reset();
    }
  }

}
