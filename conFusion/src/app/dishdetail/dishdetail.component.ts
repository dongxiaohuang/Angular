import { Component, OnInit } from '@angular/core';

import { Params, ActivatedRoute } from '@angular/router'; // receive Params of router from menu template
import { Location } from '@angular/common'; // enable to track history of browser
// import { Component, OnInit, Input } from '@angular/core';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
     // @Input()
     dish: Dish;

     constructor(private disheservice: DishService,
          private route: ActivatedRoute,
          private location: Location) { }

     ngOnInit() {
          let id = +this.route.snapshot.params['id'];
          this.dish = this.disheservice.getDish(id);
     }

     goBack(): void {
          this.location.back();
     }

}
