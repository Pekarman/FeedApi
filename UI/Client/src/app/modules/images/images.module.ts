import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowImagesComponent } from './components/show-images/show-images.component';
import { SelectImagesComponent } from './components/select-images/select-images.component';
import { UploadImagesComponent } from './components/upload-images/upload-images.component';



@NgModule({
  declarations: [
    ShowImagesComponent,
    SelectImagesComponent,
    UploadImagesComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ShowImagesComponent,
    SelectImagesComponent,
    UploadImagesComponent
  ]
})
export class ImagesModule { }
