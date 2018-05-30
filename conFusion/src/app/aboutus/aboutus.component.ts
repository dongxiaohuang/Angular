import { Component, OnInit } from '@angular/core';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {

  leaders: Leader[]; // without let
  constructor(private leadrservice: LeaderService) { }

  ngOnInit() {
    this.leadrservice.getLeaders()
          .then((leaders) => {
               this.leaders = leaders;
          });
  }

}
