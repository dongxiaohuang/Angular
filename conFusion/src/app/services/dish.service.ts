import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { Observable } from 'rxjs/Observable';


import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
// Import a module for side-effects only
// Though not recommended practice, some modules set up some global
// state that can be used by other modules. These modules may not have any
// exports, or the consumer is not interested in any of their exports. To import these modules, use:

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }
  // function name : return type
  getDishes(): Observable<Dish[]> {
    // emit only one value using `of`
    return Observable.of(DISHES).delay(2000);
  }

  getDish(id: number): Observable<Dish> {
    return Observable.of(DISHES.filter((dish) => (dish.id === id))[0]).delay(2000);
  }

  getFeaturedDish(): Observable<Dish> {
    return Observable.of(DISHES.filter(dish => dish.featured)[0]).delay(2000);
  }
}
