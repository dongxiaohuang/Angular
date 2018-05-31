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
    return new Promise(
         (resolve) => {
              // Simulate server latency with 2 second delay
              setTimeout(() => { resolve(DISHES); }, 2000);
         }
    ); // return immediately
  }
  getDish(id: number): Promise<Dish> {
       return new Promise(
            (resolve) => {
                 setTimeout( () => {
                      resolve(DISHES.filter((dish) => (dish.id === id))[0]);
                      }, 2000);
            }
       );
       // return DISHES.filter((dish) => {return dish.id === id;})[0]; // return array
 }

 getFeaturedDish(): Promise<Dish> {
      return new Promise( (resolve) => {
           setTimeout( () => {
                resolve(DISHES.filter(dish => dish.featured)[0]);
           }, 2000);
      });
}
}
