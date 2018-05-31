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
  formErrors = {
       'firstname': '',
       'lastname': '',
       'telnum': '',
       'email': ''
 };

 validationMessages = {
      'firstname': {
           'required': 'First Name is required.',
           'minlength': 'First Name must be two characters long',
           'maxlength': 'First Name cannot more than 25 characters long'
      },
      'lastname': {
           'required': 'Last Name is required.',
           'minlength': 'Last Name must be two characters long',
           'maxlength': 'Last Name cannot more than 25 characters long'
      },
      'telnum': {
           'required': 'Last Name is required.',
           'pattern': 'Tel. number must contain only numbers'
      },
      'email': {
           'required': 'Last Name is required.',
           'email': 'Email must be in the form of email'
      }
};

  constructor(private fb: FormBuilder) {
    this.createFrom();
  }

  ngOnInit() {
  }

  createFrom() {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum: [, [Validators.required, Validators.pattern]],
      email: ['', [Validators.email, Validators.required]],
      agree: false,
      contacttype: 'None',
      message: ''
    });

    // reactive form valueChanges observable
    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

      this.onValueChanged(); // (re)set form validation message
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
  onValueChanged(data?: any) {
       if ( !this.feedbackForm ) { return; }
       const form = this.feedbackForm;
       for (const field in this.formErrors ) {
            this.formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid){
                 const messages = this.validationMessages[field];
                 for(const key in control.errors) {
                      this.formErrors[field] += messages[key] + ' ';
                 }
            }

       }
 }
}
