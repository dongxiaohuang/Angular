import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Feedback, ContactType } from '../shared/feedback';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;

  constructor(private fb: FormBuilder) {
       this.createFrom();
 }

  ngOnInit() {
  }

  createFrom() {
       this.feedbackForm = this.fb.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            telnum: [, Validators.required],
            email: ['', Validators.email],
            agree: false,
            contacttype: 'None',
            message: ''
       });
 }

 onSubmit() {
      this.feedback = this.feedbackForm.value;
      console.log(this.feedback);
      this.feedbackForm.reset(
// it can also explicitly set
           {
           firstname: '',
           lastname: '',
           telnum: 0,
           email: '',
           agree: false,
           contacttype: 'None',
           message: ''
      });
}
}
