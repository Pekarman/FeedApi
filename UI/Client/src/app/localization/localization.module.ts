import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from './translate.pipe';
import { LocalizationService } from './localization.service';



@NgModule({
  declarations: [
    TranslatePipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TranslatePipe,
  ],
providers: [
  LocalizationService,
]
})
export class LocalizationModule { }
