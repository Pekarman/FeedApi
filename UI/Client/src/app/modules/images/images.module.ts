import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowImagesComponent } from './components/show-images/show-images.component';
import { SelectImagesComponent } from './components/select-images/select-images.component';



@NgModule({
  declarations: [
    ShowImagesComponent,
    SelectImagesComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SelectImagesComponent
  ]
})
export class ImagesModule { }
