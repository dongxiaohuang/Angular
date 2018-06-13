import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Params, ActivatedRoute } from '@angular/router'; // receive Params of router from menu template
import { Location } from '@angular/common'; // enable to track history of browser
import { RestangularModule, Restangular } from 'ngx-restangular';

// import { Input } from '@angular/core';

import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';
import { DishService } from '../services/dish.service';
import { baseURL } from '../shared/baseurl';
import 'rxjs/add/operator/switchmap';
import { trigger, state, animate, transition, style } from '@angular/animations';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations: [
       trigger('visibility', [
            state('shown', style({
                 transform: 'scale(1.0)',
                 opacity: 1
            })),
            state('hidden', style({
                 transform: 'scale(0.5)',
                 opacity: 0
            })),
            transition('* => *', animate('0.5s ease-in-out'))
       ])
 ]
})
export class DishdetailComponent implements OnInit {
  // @Input()
  dish: Dish;
  dishIds: number[];
  dishcopy = null; // restangular object
  prev: number;
  next: number;
  commentForm: FormGroup;
  comment: Comment;
  errMsg: string;
  visibility = 'shown';

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

  //When Angular creates a new instance of a component class,
   // it determines which services or other dependencies 
   // that component needs by looking at the types of its constructor parameters.
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
      .switchMap((params: Params) => { this.visibility = 'hidden'; return this.disheservice.getDish(+params['id']);})
      .subscribe((dish) => {
        this.dish = dish;
        this.dishcopy = dish;
        this.setPrevNext(dish.id);
        this.visibility = 'shown';
   },
   errmess => { this.dish = null; this.errMsg = <any>errmess; });
    // params observable changes it will obtain update dish
  }

  createForm() {
    //create new reactive form
    this.commentForm = this.fb.group({
      rating: [5, [Validators.required]],
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
       // let date: string = new Date().toISOString();
       // this.comment = {
       //      'rating': this.commentForm.value.rating,
       //      'comment': this.commentForm.value.comment,
       //      'author': this.commentForm.value.author,
       //      'date': date }
       this.comment = this.commentForm.value;
       this.comment.date = new Date().toISOString();

       this.dishcopy.comments.push(this.comment);
       this.dishcopy.save()
          .subscribe(dish => this.dish = dish); // confirm and subscribe
       this.commentForm.reset();
 }

}
