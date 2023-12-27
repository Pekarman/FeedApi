import { Component, Input, OnInit } from '@angular/core';
import { IDeal } from 'src/app/Models/IDeal';
import { IWatchDeal } from 'src/app/Models/IWatchDeal';
import { DealService } from 'src/app/services/deal.service';
import { SessionService } from 'src/app/services/session.service';
import * as signalR from "@microsoft/signalr"
import { ApiConfig } from 'src/app/configs/apiconfig';
import { IBet } from 'src/app/Models/IBet';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-betting',
  templateUrl: './betting.component.html',
  styleUrls: ['./betting.component.scss']
})
export class BettingComponent implements OnInit {

  @Input() deal!: IDeal;

  localePath: string = "Pages/DealPage/Betting/";

  readonly APIUrl = new ApiConfig().ApiUrl;

  myForm = new FormGroup({
    bet: new FormControl(0, [Validators.required])
  });

  responseError: boolean = false;

  IsWatchedByUser() {
    return this.getUserWatchDeal() !== undefined;
  }

  getUserWatchDeal() {
    return this.deal?.watchDeals?.find(w => w.userId == this.sessionService.getSession().userId) as IWatchDeal;
  }

  getCurrentBet() {
    let maxBet = this.deal?.startBet;
    this.deal?.bets?.forEach(bet => {
      if (bet.currentBet > maxBet) maxBet = bet.currentBet;
    });
    return maxBet;
  }

  constructor(
    private readonly sessionService: SessionService,
    private readonly dealService: DealService
    ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.fillForm();
    }, 500);

    this.runBroadcast();
  }

  fillForm() {
    this.myForm.controls.bet.setValue(this.getCurrentBet());
    this.myForm.controls.bet.setValidators(Validators.min(this.getCurrentBet() + 1));

    this.myForm.controls.bet.valueChanges.subscribe(() => {
      this.responseError = !this.myForm.controls.bet.valid;
    });
  }

  runBroadcast() {
    const connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl(this.APIUrl + "notify")
      .build();

    connection.start()
      .then(() => {
        console.log("signalR connected.");
      })
      .catch((error) => {
        return console.error(error);
      })

    connection.on("BroadcastMessage", (response) => {
      console.log(`Broadcast message received: ${response}.`);
    })
    
    connection.on("BetMade", (bet: IBet) => {
      this.updateBets(bet);
    })
  }

  makeBet(form: FormGroup) {
    if (!form.valid) {
      return;
    }
    var data: IBet = {
      id: 0,
      dealId: this.deal.id,
      userId: this.sessionService.getSession().userId,
      currentBet: form.controls.bet.value,
      timestamp: new Date()
    }

    this.dealService.makeBet(data).subscribe(bet => {
      this.updateBets(bet);
    });
  }

  updateBets(bet: IBet) {
    if(this.deal.bets?.findIndex(b => b.id == bet.id) !== -1 || this.deal.id !== bet.dealId) return;
    this.deal.bets?.push(bet);
    console.log(this.deal);
  }

  buyNowClick() {}

  addToWatchList() {
    var data: IWatchDeal = {
      id: 0,
      dealId: this.deal.id,
      userId: this.sessionService.getSession().userId
    }

    this.dealService.addWatchDeal(data).subscribe(watchDeal => {
      this.deal.watchDeals?.push(watchDeal);
    });
  }

  removeFromWatchList() {
    this.dealService.deleteWatchDeal(this.getUserWatchDeal()).subscribe(response => {
      if (response == true) this.deal.watchDeals?.splice(this.deal.watchDeals?.indexOf(this.getUserWatchDeal()));
    });
  }
}
