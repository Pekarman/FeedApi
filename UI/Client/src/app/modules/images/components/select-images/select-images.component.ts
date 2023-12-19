import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAsset } from 'src/app/Models/IAsset';

@Component({
  selector: 'app-select-images',
  templateUrl: './select-images.component.html',
  styleUrls: ['./select-images.component.scss']
})
export class SelectImagesComponent implements OnInit {

  @Input() assets?: IAsset[] | null;
  @Input() dealId?: number;

  selectedId: number = 0;
  imagesCount: number = 0;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.imagesCount = this.assets?.length as number;
  }

  isImageSelected(id: number): boolean {
    return id == this.selectedId;
  }

  goToNextImage() {
    this.selectedId++;
    if (this.selectedId == this.imagesCount) this.selectedId = 0;
  }

  goToPreviousImage() {
    this.selectedId--;
    if (this.selectedId == -1) this.selectedId = this.imagesCount - 1;
  }

  imageClick() {
    this.router.navigate([`deal/${this.dealId}`]);
  }
}
