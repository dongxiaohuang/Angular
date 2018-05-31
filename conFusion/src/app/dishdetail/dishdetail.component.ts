import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Params, ActivatedRoute } from '@angular/router'; // receive Params of router from menu template
import { Location } from '@angular/common'; // enable to track history of browser
// import { Input } from '@angular/core';

import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';
import { DishService } from '../services/dish.service';
import { baseURL } from '../shared/baseurl';
import 'rxjs/add/operator/switchmap';
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  // @Input()
  dish: Dish;
  dishIds: number[];
  prev: number;
  next: number;
  commentForm: FormGroup;
  comment: Comment;
  errMsg: string;

  formErrors = {
    'rating': '',
    'comment': '',
    'author': ''
  };
  validationMessages = {
    'rating': { 'required': 'Rating is required' },
    'comment': { 'required': 'Comment is required' },
    'author': {
      'required': 'Author is required',
      'minlength': 'Author must be two characters long'
    }
  }

  constructor(private disheservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
     @Inject('BaseURL') private BaseURL) {
    this.createForm()
  }

  ngOnInit() {

    this.disheservice.getDishIds()
      .subscribe(
           (dishIds) => this.dishIds = dishIds,
           (err) => this.errMsg = <any> err
);
    // ActivatedRoute provides a set of observables
    // params obtains params from url
    // take one snapshot from route service and obtain value of params at that
    // particular time
    // let id = +this.route.snapshot.params['id'];

    // + convert a string into interger value
    this.route.params
      .switchMap((params: Params) => this.disheservice.getDish(+params['id']))
      .subscribe((dish) => {
        this.dish = dish;
        this.setPrevNext(dish.id);
      });
    // params observable changes it will obtain update dish
  }

  createForm() {
    //create new reactive form
    this.commentForm = this.fb.group({
      rating: ['', [Validators.required]],
      comment: ['', Validators.required],
      author: ['', [Validators.required, Validators.minLength(2)]]
    });

    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanges(data));
    this.onValueChanges();
  };

  setPrevNext(dishId: number) {
    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }
  onValueChanges(data?: any) {
       if( !this.commentForm) return;
       const form = this.commentForm;
       for( const field in this.formErrors){
            this.formErrors[field] = '';
            const control = form.get(field);
            if(control && control.dirty && !control.valid){
                 const messages = this.validationMessages[field];
                 for(const key in control.errors)
                    this.formErrors[field] += messages[key];
            }
       }
  }

  onSubmit() {
       let date: string = new Date().toISOString();
       this.comment = {
            'rating': this.commentForm.value.rating,
            'comment': this.commentForm.value.comment,
            'author': this.commentForm.value.author,
            'date': date }
       this.dish.comments.push(this.comment);
       this.commentForm.reset();
 }

}
