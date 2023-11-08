import { Component, Input, OnInit } from '@angular/core';
import { Deal } from 'src/app/Models/Deal';

@Component({
  selector: 'app-deal-list-view',
  templateUrl: './deal-list-view.component.html',
  styleUrls: ['./deal-list-view.component.scss']
})
export class DealListViewComponent implements OnInit {

  @Input() deal!: Deal;

  constructor() { }

  ngOnInit(): void {
  }

}
