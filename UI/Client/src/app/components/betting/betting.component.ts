import { Component, Input, OnInit } from '@angular/core';
import { IDeal } from 'src/app/Models/IDeal';

@Component({
  selector: 'app-betting',
  templateUrl: './betting.component.html',
  styleUrls: ['./betting.component.scss']
})
export class BettingComponent implements OnInit {

  @Input() deal!: IDeal;

  localePath: string = "Pages/DealPage/Betting/";

  constructor() { }

  ngOnInit(): void {}

  buyNowClick() {}

  makeBet() {}

  addToWatchList() {}
}
