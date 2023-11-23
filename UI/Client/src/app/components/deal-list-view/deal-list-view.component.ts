import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationExtras, Router } from '@angular/router';
import { IAsset } from 'src/app/Models/IAsset';
import { IDeal } from 'src/app/Models/IDeal';

@Component({
  selector: 'app-deal-list-view',
  templateUrl: './deal-list-view.component.html',
  styleUrls: ['./deal-list-view.component.scss']
})
export class DealListViewComponent implements OnInit {

  @Input() deal!: IDeal;

  base64Image!: any;

  constructor(private domSanitizer: DomSanitizer, private router: Router) { }

  ngOnInit(): void {
    this.renderImage();
  }

  onClick() {
    this.router.navigate([`deal/${this.deal.id}`]);
  }

  renderImage() {
    var asset = this.deal.assets.find((item: IAsset) => item.imageData !== "");
    if (asset == undefined) return;
    this.base64Image = this.domSanitizer.bypassSecurityTrustUrl("data:image/jpeg;base64, " + asset.imageData);
  }
}
