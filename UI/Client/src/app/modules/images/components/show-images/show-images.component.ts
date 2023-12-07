import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IAsset } from 'src/app/Models/IAsset';

@Component({
  selector: 'app-show-images',
  templateUrl: './show-images.component.html',
  styleUrls: ['./show-images.component.scss']
})
export class ShowImagesComponent implements OnInit {
  
  @Input() asset!: IAsset;
  base64Image!: any;

  constructor(
    private domSanitizer: DomSanitizer
    ) { }

  ngOnInit(): void {
    this.renderImage(this.asset);
  }
  
  renderImage(asset: IAsset)  {
      if (asset.imageData == "") return;
      this.base64Image = this.domSanitizer.bypassSecurityTrustUrl("data:image/jpeg;base64, " + asset.imageData);
  }
}
