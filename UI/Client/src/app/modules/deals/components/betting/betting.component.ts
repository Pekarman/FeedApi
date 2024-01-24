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
import { IAuction } from 'src/app/Models/IAuction';
import { IAutoBet } from 'src/app/Models/IAutoBet';
import { IUser } from 'src/app/Models/IUser';

@Component({
  selector: 'app-betting',
  templateUrl: './betting.component.html',
  styleUrls: ['./betting.component.scss']
})
export class BettingComponent implements OnInit {

  @Input() deal!: IDeal;
  @Input() auction!: IAuction;

  localePath: string = "Pages/DealPage/Betting/";

  readonly APIUrl = new ApiConfig().ApiUrl;

  myForm = new FormGroup({
    bet: new FormControl(0, [Validators.required])
  });

  autoBetForm = new FormGroup({
    maxBet: new FormControl(0),
    betStep: new FormControl(0)
  });

  myAutoBet!: IAutoBet;

  currentBet: number = 0;
  winnerUser!: IUser;
  winnerFullName: string = "";

  isBuyNowButtonEnabled: boolean = true;

  isAutoBetApplied(): boolean {
    var isApplied = false;
    this.auction?.autoBets?.forEach(a => {
      if (a.userId == this.sessionService.getSession().userId) isApplied = true;
    });
    return isApplied;
  }

  isAuctionStarted() {
    if (this.auction == undefined || typeof(this.auction) == typeof("")) return false;
    var now = new Date();
    var start = new Date(this.auction.auctionStart);
    var end = new Date(this.auction.auctionEnd);
    
    var toStart = +now - +start;
    var toEnd = +now - +end;

    return toStart > 0 && toEnd < 0;
  }

  isTenMinutesBeforeStart() {
    if (this.auction == undefined || typeof(this.auction) == typeof("")) return false;
    var now = new Date();
    var start = new Date(this.auction.auctionStart);
    
    var toStart = +now - +start;    
    var negative = false;
    if (toStart < 0) {
      negative = true;
      toStart *= -1;
    }
    var minutesLeft = Math.floor(toStart / 60000);

    return negative && minutesLeft < 10;
  }

  isAuctionEnded() {
    if (this.auction == undefined || typeof(this.auction) == typeof("")) return false;
    var now = new Date();
    var end = new Date(this.auction.auctionEnd);
    
    var toStart = +now - +end;

    return toStart > 0;
  }

  IsWatchedByUser() {
    return this.getUserWatchDeal() !== undefined;
  }

  getUserWatchDeal() {
    return this.deal?.watchDeals?.find(w => w.userId == this.sessionService.getSession().userId) as IWatchDeal;
  }

  constructor(
    private readonly sessionService: SessionService,
    private readonly userService: UserService,
    private readonly dealService: DealService
    ) {}

  ngOnInit(): void {
    this.runBroadcast();
    setInterval(() => {
      this.fillForm();
    }, 1000);
  }

  isFormFilled = false;

  fillForm() {
    if (this.deal == undefined || this.isFormFilled) return;
    var button = document.getElementById('buyNowButton');
    if (this.deal.statusId !== 1) {
      button?.setAttribute('disabled', 'true');
    }
    else {
      button?.removeAttribute('disabled');
    }

    this.getCurrentBet();
    this.getMyAutoBet();

    this.isFormFilled = true;    
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
     
    connection.on("UpdateAuction", (auction: IAuction) => {
      if (auction.dealId !== this.deal.id) return;
      this.updateAuction(auction);
      this.makeAutoBet();
    })
  }

  setAutoBet(form: FormGroup) {
    form.markAllAsTouched();
    form.controls.maxBet.updateValueAndValidity();
    form.controls.betStep.updateValueAndValidity();
    if (!form.valid) return;
    
    var data: IAutoBet = {
      id: 0,
      dealId: this.deal.id,
      userId: this.sessionService.getSession().userId,
      maxBet: form.controls.maxBet.value,
      betStep: form.controls.betStep.value
    }
    this.dealService.setAutoBet(data).subscribe(auction => {
      this.auction = auction;
    });
  }

  makeAutoBet() {
    setTimeout(() => {
      if (this.isAutoBetApplied() && this.winnerUser.id != this.sessionService.getSession().userId) {
        var newBet = this.currentBet + this.myAutoBet.betStep;
        if (newBet > this.myAutoBet.maxBet) return;
        this.myForm.controls.bet.setValue(newBet);
        this.makeBet(this.myForm);
      }
    }, 2000);
  }

  cancelAutoBet() {
    if (!this.isAutoBetApplied()) return;

    var data: IAutoBet = {
      id: 0,
      dealId: this.deal.id,
      userId: this.sessionService.getSession().userId,
      maxBet: 0,
      betStep: 0
    }
    this.dealService.cancelAutoBet(data).subscribe(auction => {
      this.auction = auction;
    });
  }
 
  makeBet(form: FormGroup) {
    form.markAllAsTouched();
    form.controls.bet.updateValueAndValidity();
    if (!form.valid) return;
    
    var data: IBet = {
      id: 0,
      dealId: this.deal.id,
      userId: this.sessionService.getSession().userId,
      currentBet: form.controls.bet.value,
      timestamp: new Date()
    }

    this.dealService.makeBet(data).subscribe(auction => {
      // console.log(auction);
      // this.auction = auction;
      // this.updateBets(auction);
    });
  }

  updateAuction(auction: IAuction) {
    this.auction = auction;
    this.updateBets(auction);
  }

  updateBets(auction: IAuction) {
    this.deal.bets = auction.bets;
    this.getCurrentBet();
    this.getMyAutoBet();
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

    this.myForm.controls.bet.setValue(this.currentBet);
    this.myForm.controls.bet.setValidators(Validators.min(this.currentBet + 1));

    if (winnerId !== 0) {
      this.userService.getUserById(winnerId).subscribe(user => {
        this.winnerUser = user;
        this.winnerFullName = `${user.firstName} ${user.lastName}`;
      });
    }
    return this.currentBet;
  }

  getMyAutoBet() {    
    var myAutoBet = this.auction?.autoBets?.find(a => a.userId == this.sessionService.getSession().userId);
  
    this.autoBetForm.controls.maxBet.setValidators(Validators.min(this.currentBet + 1));
    this.autoBetForm.controls.betStep.setValidators(Validators.min(0.01));

    if (myAutoBet !== undefined) {
      this.autoBetForm.controls.maxBet.setValue(myAutoBet?.maxBet);    
      this.autoBetForm.controls.betStep.setValue(myAutoBet?.betStep);
    } else {
      this.autoBetForm.controls.maxBet.setValue(this.currentBet);    
      this.autoBetForm.controls.betStep.setValue(1);
    }
    this.myAutoBet = myAutoBet as IAutoBet;
    this.myAutoBet;
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

  timeLeftToStart() {
    if (this.auction == undefined || typeof(this.auction) == typeof("")) return;

    var now = new Date();    
    var start = new Date(this.auction?.auctionStart);

    var leftMilliseconds = +start - +now;

    if (leftMilliseconds < 0) leftMilliseconds *= -1;

    var minutesLeft = Math.floor(leftMilliseconds / 60000);
    if (minutesLeft >= 1) leftMilliseconds %= 60000;
    var secondsLeft = Math.floor(leftMilliseconds / 1000);

    return `${minutesLeft}:${secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}`;
  }

  timeLeft() {
    if (this.auction == undefined || typeof(this.auction) == typeof("")) return;

    var now = new Date();    
    var end = new Date(this.auction?.auctionEnd);

    var leftMilliseconds = +end - +now;

    if (leftMilliseconds < 0) leftMilliseconds *= -1;

    var minutesLeft = Math.floor(leftMilliseconds / 60000);
    if (minutesLeft >= 1) leftMilliseconds %= 60000;
    var secondsLeft = Math.floor(leftMilliseconds / 1000);

    return `${minutesLeft}:${secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}`;
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
