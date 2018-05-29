import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';


@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }
  // function name : return type
  getDishes(): Dish[] {
    return DISHES;
  }
  getDish(id: number): Dish {
       return DISHES.filter((dish) => (dish.id === id))[0]; // return array
       // return DISHES.filter((dish) => {return dish.id === id;})[0]; // return array
 }

 getFeaturedDish(): Dish {
      return DISHES.filter((dish) => (dish.featured))[0];
}
}
