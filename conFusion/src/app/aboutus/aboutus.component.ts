import { Component, OnInit } from '@angular/core';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {

  leaders: Leader[]; // without let
  constructor(private leadrservice: LeaderService,
private router: Router) { }

  ngOnInit() {
    this.leadrservice.getLeaders()
          .subscribe((leaders) => {
               this.leaders = leaders;
          });
  }

}
