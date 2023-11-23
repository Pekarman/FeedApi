import { Component, Input, OnInit } from '@angular/core';
import { IDeal } from 'src/app/Models/IDeal';
import { DealService } from 'src/app/services/deal.service';

@Component({
  selector: 'app-deal-list',
  templateUrl: './deal-list.component.html',
  styleUrls: ['./deal-list.component.scss']
})
export class DealListComponent implements OnInit {

  @Input() searchValue = '';

  DealsList : IDeal[] = [];

  constructor(private readonly dealService: DealService) { }

  ngOnInit(): void {
    this.refreshDealsList();
  }
  
  refreshDealsList(){
    this.dealService.getAllDeals().subscribe(data => {
      this.DealsList = data;
    });
  }  
  
  isMatch(regex: string, source: string): boolean{
    if(source.toLowerCase().indexOf(regex.toLowerCase()) > -1) return true;
    else return false;
  }
}
