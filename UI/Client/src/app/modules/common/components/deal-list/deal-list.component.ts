import { Component, Input, OnInit } from '@angular/core';
import { IDeal } from 'src/app/Models/IDeal';
import { DealService } from 'src/app/services/deal.service';
import { DealListFilter } from './DealListFilter';
import { SpinnerService } from 'src/app/modules/spinner/spinner.service';

@Component({
  selector: 'app-deal-list',
  templateUrl: './deal-list.component.html',
  styleUrls: ['./deal-list.component.scss']
})
export class DealListComponent implements OnInit {

  @Input() searchValue = '';
  @Input() filter!: DealListFilter;

  DealsList : IDeal[] = [];

  constructor(private readonly dealService: DealService, private readonly spinnerService: SpinnerService) { }

  ngOnInit(): void {
    this.refreshDealsList();
  }

  refreshDealsList(){
    if(this.filter) {
      this.spinnerService.wrap(this.dealService.getDealsByFilter(this.filter))
        .subscribe(data => {
          if (typeof(data) == typeof("")) {
            return
          }
          this.DealsList = data;
        });
      return;
    }

    this.spinnerService.wrap(this.dealService.getAllDeals()).subscribe(data => {
      if (typeof(data) == typeof("")) return;
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
