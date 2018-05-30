import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';


@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }
  // function name : return type
  getDishes(): Promise<Dish[]> {
    return Promise.resolve(DISHES); // return immediately
  }
  getDish(id: number): Promise<Dish> {
       return Promise.resolve(DISHES.filter((dish) => (dish.id === id))[0]); // return array
       // return DISHES.filter((dish) => {return dish.id === id;})[0]; // return array
 }

 getFeaturedDish(): Promise<Dish> {
      return Promise.resolve(DISHES.filter((dish) => (dish.featured))[0]);
}
}
