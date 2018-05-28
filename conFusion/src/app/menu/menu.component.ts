import { Component, OnInit } from '@angular/core';

import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
     //name : type =initilization
     dishes = DISHES;

     selectedDish: Dish;
     constructor() {}

     ngOnInit() {}

     onSelect(dish: Dish) {
          this.selectedDish = dish;
     }

}
