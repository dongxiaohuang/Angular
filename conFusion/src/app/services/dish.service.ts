import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';

import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { RestangularModule, Restangular } from 'ngx-restangular';

import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map'
// Import a module for side-effects only
// Though not recommended practice, some modules set up some global
// state that can be used by other modules. These modules may not have any
// exports, or the consumer is not interested in any of their exports. To import these modules, use:

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private restangular: Restangular,
     private processHTTPMsgService: ProcessHTTPMsgService
 ) { }
  // function name : return type
  getDishes(): Observable<Dish[]> {
    // emit only one value using `of`
    return this.restangular.all('dishes').getList();
  }

  getDish(id: number): Observable<Dish> {
      return this.restangular.one('dishes', id).get();
    // return Observable.of(DISHES.filter((dish) => (dish.id === id))[0]).delay(2000);
  }

  getFeaturedDish(): Observable<Dish> {
    return this.restangular.all('dishes').getList({featured: true})
          .map(dishes => dishes[0]);
  }
  getDishIds(): Observable<number[]> {
       // transfer by map
       return this.getDishes()
          .map(dishes => {
               return dishes.map(dish => dish.id);})
               .catch(error => {return this.processHTTPMsgService.handleError(error)});
 }
}
