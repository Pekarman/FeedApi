import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationExtras, Router } from '@angular/router';
import { IAsset } from 'src/app/Models/IAsset';
import { IDeal } from 'src/app/Models/IDeal';
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

  showChangeButton: boolean = false;

  getChangeDealPath(): string {
    return `changeDeal/${this.deal.id}`;
  }

  constructor(
    private sessionService: SessionService,
    private domSanitizer: DomSanitizer,
    private router: Router
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
}
