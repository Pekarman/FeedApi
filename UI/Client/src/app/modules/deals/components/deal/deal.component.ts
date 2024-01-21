import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {IDeal} from 'src/app/Models/IDeal';
import {DealService} from 'src/app/services/deal.service';
import {SessionService} from "src/app/services/session.service";
import {DealStatusEnum} from "src/app/enums/DealStatus";
import { IAuction } from 'src/app/Models/IAuction';


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
    private domSanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private readonly dealService: DealService,
    private router: Router,
    public userSession: SessionService
  ) {

  }

  changeStatus() {
    const id = this.route.snapshot.params.id as unknown as number;
    this.dealService.updateStatusActive(id).subscribe(response => {
      if (response.statusId) {
        this.statusEnum.forEach((el, index) => response.statusId === index ? this.countStatus = el : null)
      }
    })
  }

  ngOnInit(): void {
    this.loadResources();
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

  renderImages(deal: IDeal) {
    deal.assets?.forEach((asset: any) => {
      if (asset == undefined || asset.imageData == "") return;
      this.base64Image = this.domSanitizer.bypassSecurityTrustUrl("data:image/jpeg;base64, " + asset.imageData);
    });
  }
}
