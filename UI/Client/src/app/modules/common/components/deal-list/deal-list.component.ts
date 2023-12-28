import { Component, Input, OnInit } from '@angular/core';
import { IDeal } from 'src/app/Models/IDeal';
import { DealService } from 'src/app/services/deal.service';
import { IDealListFilter } from './IDealListFilter';

@Component({
  selector: 'app-deal-list',
  templateUrl: './deal-list.component.html',
  styleUrls: ['./deal-list.component.scss']
})
export class DealListComponent implements OnInit {

  @Input() searchValue = '';
  @Input() filter!: IDealListFilter;

  DealsList : IDeal[] = [];

  constructor(private readonly dealService: DealService) { }

  ngOnInit(): void {
    this.refreshDealsList();
  }

  refreshDealsList(){
    if(this.filter) {
      this.dealService.getDealsByFilter(this.filter).subscribe(data => {
        this.DealsList = data;
      });
      return;
    }

    this.dealService.getAllDeals().subscribe(data => {
      this.DealsList = data;
    });
  }

  isMatch(regex: string, deal: IDeal): boolean{
    var productName = deal.productName;
    var shortDesc = deal.shortDesc;
    var longDesc = deal.longDesc;
    return this.isRegexMatch(regex, productName) || this.isRegexMatch(regex, shortDesc) || this.isRegexMatch(regex, longDesc)
  }

  isRegexMatch(regex: string, source: string): boolean {
    return source.toLowerCase().indexOf(regex.toLowerCase()) > -1;
  }
}
