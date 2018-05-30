import { Component, OnInit } from '@angular/core';

import { Dish } from '../shared/dish';

import { DishService } from '../services/dish.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
     // name : type =initilization
     dishes: Dish[];

     selectedDish: Dish;
     constructor(private dishService: DishService) {
          // called first time before the ngOnInit()
          // you should use constructor() to setup Dependency Injection and not much else.

     }
     ngOnInit() {
          // called after the constructor and called  after the first ngOnChanges()
          this.dishService.getDishes()
               .then((dishes) => {
                    this.dishes = dishes;
               });
          // ngOnInit() is better place to "start" - it's where/when components' bindings are resolved.
     }

     onSelect(dish: Dish) {
          this.selectedDish = dish;
     }

}
