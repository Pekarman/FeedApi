import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationExtras, Router } from '@angular/router';
import { Deal } from 'src/app/Models/Deal';

@Component({
  selector: 'app-deal-list-view',
  templateUrl: './deal-list-view.component.html',
  styleUrls: ['./deal-list-view.component.scss']
})
export class DealListViewComponent implements OnInit {

  @Input() deal!: Deal;

  base64Image!: any;

  constructor(private domSanitizer: DomSanitizer, private router: Router) { }

  ngOnInit(): void {
    this.renderImage();
  }

  onClick() {
    this.router.navigate([`deal/${this.deal.id}`]);
  }

  renderImage() {
    var asset = this.deal.assets.find(item => item.imageData !== "");
    if (asset == undefined) return;
    this.base64Image = this.domSanitizer.bypassSecurityTrustUrl("data:image/jpeg;base64, " + asset.imageData);
  }
}
