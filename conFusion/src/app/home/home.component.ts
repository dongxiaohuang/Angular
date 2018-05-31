import { Component, OnInit, Inject } from '@angular/core';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { Leader } from '../shared/leader';
import { PromotionService } from '../services/promotion.service';
import { LeaderService } from '../services/leader.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

     dish: Dish;
     promotion: Promotion;
     leader: Leader;
     disherrMsg: string;
     promoerrMsg: string;
     leadererrMsg: string;
  constructor(private dishservice: DishService,
       private promoservice: PromotionService,
       private leaderservice: LeaderService,
       @Inject('BaseURL') private BaseURL
 ) { }

  ngOnInit() {
       this.dishservice.getFeaturedDish()
          .subscribe(
               (dish) => {this.dish = dish;},
               (err) => this.disherrMsg = <any> err
          );
       this.promoservice.getFeaturedPromotion()
          .subscribe((promo) => {
               this.promotion = promo;
          });
       this.leaderservice.getFeaturedLeader()
          .subscribe((leader) => {
               this.leader = leader;
          });
  }

}
