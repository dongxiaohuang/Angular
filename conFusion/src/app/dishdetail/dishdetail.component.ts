import { Component, OnInit } from '@angular/core';

import { Params, ActivatedRoute } from '@angular/router'; // receive Params of router from menu template
import { Location } from '@angular/common'; // enable to track history of browser
// import { Input } from '@angular/core';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

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

     constructor(private disheservice: DishService,
          private route: ActivatedRoute,
          private location: Location) { }

     ngOnInit() {

          this.disheservice.getDishIds()
               .subscribe( (dishIds) => this.dishIds = dishIds );
          // ActivatedRoute provides a set of observables
          // params obtains params from url
          // take one snapshot from route service and obtain value of params at that
          // particular time
          // let id = +this.route.snapshot.params['id'];

          // + convert a string into interger value
          this.route.params
               .switchMap((params: Params) => this.disheservice.getDish(+params['id']))
               .subscribe( (dish) => {
                    this.dish = dish;
                    this.setPrevNext(dish.id);
               });
          // params observable changes it will obtain update dish
     }

     setPrevNext(dishId: number) {
          let index = this.dishIds.indexOf(dishId);
          this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
          this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
     }

     goBack(): void {
          this.location.back();
     }

}
