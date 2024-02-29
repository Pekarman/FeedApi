import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { IAsset } from 'src/app/Models/IAsset';
import { IDeal } from 'src/app/Models/IDeal';
import { ISell } from 'src/app/Models/ISell';
import { IWatchDeal } from 'src/app/Models/IWatchDeal';
import { LocalizationService } from 'src/app/localization/localization.service';
import { BettingComponent } from 'src/app/modules/deals/components/betting/betting.component';
import { SpinnerService } from 'src/app/modules/spinner/spinner.service';
import { DealService } from 'src/app/services/deal.service';
import { ModalService } from 'src/app/services/modal.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-deal-list-view',
  templateUrl: './deal-list-view.component.html',
  styleUrls: ['./deal-list-view.component.scss']
})
export class DealListViewComponent implements OnInit {

  @Input() deal!: IDeal;
  userId!: any;

  base64Image!: any;
  localePath: string = 'Pages/DealPage/'

  showChangeButton: boolean = false;

  getChangeDealPath(): string {
    return `changeDeal/${this.deal.id}`;
  }

  constructor(
    private sessionService: SessionService,
    private domSanitizer: DomSanitizer,
    private router: Router,
    private readonly route: ActivatedRoute,
    private readonly dealService: DealService,
    private readonly modalService: ModalService,
    private readonly localizationService: LocalizationService,
    private readonly snackBar: MatSnackBar,
    private readonly spinnerService: SpinnerService,
    ) { }

  ngOnInit(): void {
    this.showChangeButton = this.deal.userId == this.sessionService.getSession()?.userId;
    this.renderImage();
  }

  onClick() {
    this.router.navigate([`deal/${this.deal.id}`]);
  }

  renderImage() {
    var asset = this.deal.assets?.find((item: IAsset) => item.imageData !== "");
    if (asset == undefined) return;
    this.base64Image = this.domSanitizer.bypassSecurityTrustUrl("data:image/jpeg;base64, " + asset.imageData);
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

    this.spinnerService.wrap(this.dealService.addWatchDeal(data)).subscribe(watchDeal => {
      this.deal.watchDeals?.push(watchDeal);
    });
  }

  removeFromWatchList() {
    this.spinnerService.wrap(this.dealService.deleteWatchDeal(this.getUserWatchDeal())).subscribe(response => {
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
    this.spinnerService.wrap(this.dealService.buyNow(data)).subscribe(sell => {
      if (typeof(sell) == typeof("")) alert(sell);

      window.location.reload();
    });
  }

  openBettingModal() {
    const dialogRef = this.modalService.openModal(BettingComponent, {deal: this.deal});
  }

  redirectToChangeDeal() {
    this.router.navigate([`changeDeal/${this.deal.id}`])
  }

  deleteDeal() {
    this.spinnerService.wrap(this.dealService.deleteDeal(this.deal)).subscribe(response => {
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

}
