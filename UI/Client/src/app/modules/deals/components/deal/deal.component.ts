import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {IDeal} from 'src/app/Models/IDeal';
import {DealService} from 'src/app/services/deal.service';
import {SessionService} from "src/app/services/session.service";
import {DealStatusEnum} from "src/app/enums/DealStatus";
import { IAuction } from 'src/app/Models/IAuction';
import { ModalService } from 'src/app/services/modal.service';
import { BettingComponent } from '../betting/betting.component';
import { ISell } from 'src/app/Models/ISell';
import { IWatchDeal } from 'src/app/Models/IWatchDeal';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalizationService } from 'src/app/localization/localization.service';


@Component({
  selector: 'app-deal',
  templateUrl: './deal.component.html',
  styleUrls: ['./deal.component.scss']
})
export class DealComponent implements OnInit {

  deal!: IDeal;
  auction!: IAuction;
  base64Image!: any;
  localePath: string = 'Pages/DealPage/'
  statusEnum = Object.values(DealStatusEnum).filter(el => el !== Number(el));
  countStatus: string | DealStatusEnum = '';

  constructor(
    public readonly sessionService: SessionService,
    private readonly domSanitizer: DomSanitizer,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly dealService: DealService,
    private readonly modalService: ModalService,
    private readonly localizationService: LocalizationService,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadResources();
  }

  isBuyNowEnabled() {
    return this.deal?.statusId == 1;
  }

  isOwnedDeal() {
    return this.deal?.userId === this.sessionService.getSession()?.userId;
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
  
  IsWatchedByUser() {
    return this.getUserWatchDeal() !== undefined;
  }

  getUserWatchDeal() {
    return this.deal?.watchDeals?.find(w => w.userId == this.sessionService.getSession().userId) as IWatchDeal;
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

  changeStatus() {
    const id = this.route.snapshot.params.id as unknown as number;
    this.dealService.updateStatusActive(id).subscribe(response => {
      if (response.statusId) {
        this.statusEnum.forEach((el, index) => response.statusId === index ? this.countStatus = el : null);        
        this.snackBar.open(
          this.localizationService.translate(this.localePath + 'DealActivated', null),
          this.localizationService.translate("Ok", null),
        );
      }
    })
  }

  openBettingModal() {
    this.modalService.openModal(BettingComponent, {deal: this.deal, auction: this.auction})
  }

  loadResources() {
    var dealId = this.route.snapshot.params.id as unknown as number;
    this.dealService.getDeal(dealId).subscribe(deal => {
      this.deal = deal;
      this.renderImages(deal);

      this.statusEnum.forEach((el, index) => {
        if (this.deal.statusId === index) {
          this.countStatus = el;
        }
      });
    });

    this.dealService.getAuction(dealId).subscribe(auction => {
      this.auction = auction;
    });
  }

  redirectToChangeDeal() {
    this.router.navigate([`changeDeal/${this.deal.id}`])
  }

  deleteDeal() {
    this.dealService.deleteDeal(this.deal).subscribe(response => {
      if (response == true) {
        this.snackBar.open(
          this.localizationService.translate(this.localePath + 'DealDeleted', null),
          this.localizationService.translate("Ok", null),
          );
        this.router.navigate(['']);
      } else {
        this.snackBar.open(response as string, 'Ok');
      }
    });
  }

  renderImages(deal: IDeal) {
    deal.assets?.forEach((asset: any) => {
      if (asset == undefined || asset.imageData == "") return;
      this.base64Image = this.domSanitizer.bypassSecurityTrustUrl("data:image/jpeg;base64, " + asset.imageData);
    });
  }
}