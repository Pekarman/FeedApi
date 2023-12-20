import { Component, Input, OnInit } from '@angular/core';
import { IDeal } from 'src/app/Models/IDeal';
import { IWatchDeal } from 'src/app/Models/IWatchDeal';
import { DealService } from 'src/app/services/deal.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-betting',
  templateUrl: './betting.component.html',
  styleUrls: ['./betting.component.scss']
})
export class BettingComponent implements OnInit {

  @Input() deal!: IDeal;

  localePath: string = "Pages/DealPage/Betting/";

  IsWatchedByUser() {
    return this.getUserWatchDeal() !== undefined;
  }

  getUserWatchDeal() {
    return this.deal?.watchDeals?.find(w => w.userId == this.sessionService.getSession().userId) as IWatchDeal;
  }

  constructor(
    private readonly sessionService: SessionService,
    private readonly dealService: DealService
    )
    {}

  ngOnInit(): void {}

  buyNowClick() {}

  makeBet() {}

  addToWatchList() {
    var data: IWatchDeal = {
      id: 0,
      dealId: this.deal.id,
      userId: this.sessionService.getSession().userId
    }

    this.dealService.addWatchDeal(data).subscribe(response => {
      this.deal.watchDeals?.push(response);
    });
  }

  removeFromWatchList() {
    this.dealService.deleteWatchDeal(this.getUserWatchDeal()).subscribe(response => {
      if (response == true) this.deal.watchDeals?.splice(this.deal.watchDeals?.indexOf(this.getUserWatchDeal()));
    });
  }
}
