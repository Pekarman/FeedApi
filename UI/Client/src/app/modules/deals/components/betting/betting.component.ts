import { Component, Input, OnInit } from '@angular/core';
import { IDeal } from 'src/app/Models/IDeal';
import { IWatchDeal } from 'src/app/Models/IWatchDeal';
import { DealService } from 'src/app/services/deal.service';
import { SessionService } from 'src/app/services/session.service';
import * as signalR from "@microsoft/signalr"
import { ApiConfig } from 'src/app/configs/apiconfig';
import { IBet } from 'src/app/Models/IBet';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ISell } from 'src/app/Models/ISell';

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

  currentBet: number = 0;
  winnerFullName: string = "";

  responseError: boolean = false;

  isBuyNowButtonEnabled: boolean = true;

  IsWatchedByUser() {
    return this.getUserWatchDeal() !== undefined;
  }

  getUserWatchDeal() {
    return this.deal?.watchDeals?.find(w => w.userId == this.sessionService.getSession().userId) as IWatchDeal;
  }

  getCurrentBet() {
    if (this.deal == null) return 0;
    let winnerId = 0;
    this.currentBet = this.deal?.startBet;
    this.deal?.bets?.forEach(bet => {
      if (bet.currentBet > this.currentBet && this.deal.id == bet.dealId) {
        this.currentBet = bet.currentBet;
        winnerId = bet.userId;
      }
    });
    if (winnerId !== 0) {
      this.userService.getUserById(winnerId).subscribe(user => {
        this.winnerFullName = `${user.firstName} ${user.lastName}`;
      });
    }    
    return this.currentBet;
  }

  constructor(
    private readonly sessionService: SessionService,
    private readonly userService: UserService,
    private readonly dealService: DealService
    ) {}

  ngOnInit(): void {
    this.runBroadcast();
    setTimeout(() => {
      this.fillForm();
    }, 1000);
  }

  fillForm() {
    if (this.deal == undefined) return;
    var button = document.getElementById('buyNowButton');
    if (this.deal.statusId !== 1) {
      button?.setAttribute('disabled', 'true');
    }
    else {
      button?.removeAttribute('disabled');
    }
    this.currentBet = this.getCurrentBet();
    this.myForm.controls.bet.setValue(this.currentBet);
    this.myForm.controls.bet.setValidators(Validators.min(this.currentBet + 1));

    this.myForm.controls.bet.valueChanges.subscribe(() => {
      this.responseError = this.myForm.controls.bet.value <= this.currentBet;
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
    form.controls.bet.markAsTouched();
    if (this.myForm.controls.bet.value <= this.currentBet) {
      this.responseError = true;
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
    this.currentBet = this.getCurrentBet();
    this.myForm.controls.bet.setValue(this.currentBet);
    this.myForm.controls.bet.clearValidators();
    this.myForm.controls.bet.setValidators(Validators.min(this.currentBet + 1));
  }

  buyNowClick() {
    var data: ISell = {
      id: 0,
      dealId: this.deal.id,
      userId: this.sessionService.getSession().userId,
      ownerId: this.deal.userId,
    }    
    this.dealService.buyNow(data).subscribe(sell => {
      if (typeof(sell) == typeof("")) alert(sell);

      window.location.reload();
    });
  }

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
