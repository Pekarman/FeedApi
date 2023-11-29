import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { IDeal } from 'src/app/Models/IDeal';
import { DealService } from 'src/app/services/deal.service';

@Component({
  selector: 'app-deal',
  templateUrl: './deal.component.html',
  styleUrls: ['./deal.component.scss']
})
export class DealComponent implements OnInit {

  deal!: IDeal;
  base64Image!: any;

  constructor(
    private domSanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private readonly dealService: DealService
    ) { }

  ngOnInit(): void {
    var id = this.route.snapshot.params.id as unknown as number;

    this.dealService.getDeal(id).subscribe(deal => {
      this.deal = deal;

      this.renderImages(deal);
    });
  }
  
  renderImages(deal: IDeal) {
    deal.assets?.forEach((asset: any) => {      
      if (asset == undefined || asset.imageData == "") return;
      this.base64Image = this.domSanitizer.bypassSecurityTrustUrl("data:image/jpeg;base64, " + asset.imageData);
    });
  }
}
