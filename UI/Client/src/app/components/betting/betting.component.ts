import { Component, Input, OnInit } from '@angular/core';
import { Deal } from 'src/app/Models/Deal';

@Component({
  selector: 'app-betting',
  templateUrl: './betting.component.html',
  styleUrls: ['./betting.component.scss']
})
export class BettingComponent implements OnInit {

  @Input() deal!: Deal;

  constructor() { }

  ngOnInit(): void {
    console.log(this.deal);
    debugger;
  }

  buyNowClick() {}
}
