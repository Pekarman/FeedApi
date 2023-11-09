import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Deal } from 'src/app/Models/Deal';

@Component({
  selector: 'app-deal-list-view',
  templateUrl: './deal-list-view.component.html',
  styleUrls: ['./deal-list-view.component.scss']
})
export class DealListViewComponent implements OnInit {

  @Input() deal!: Deal;

  base64Image!: any;

  constructor(private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.renderImage();
  }

  renderImage() {
    var asset = this.deal.assets.find(item => item.imageData !== "");
    if (asset == undefined) return;
    var res = "data:image/jpeg;base64, " + asset.imageData;
    this.base64Image = this.domSanitizer.bypassSecurityTrustUrl(res);
  }
}
