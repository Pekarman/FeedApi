import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabeledInputComponent } from './components/labeled-input/labeled-input.component';
import { OkCancelComponent } from './components/ok-cancel/ok-cancel.component';
import { LocalizationModule } from 'src/app/localization/localization.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { UsersButtonComponent } from './components/users-button/users-button.component';
import { DealListViewComponent } from 'src/app/modules/common/components/deal-list-view/deal-list-view.component';
import { DealListComponent } from 'src/app/modules/common/components/deal-list/deal-list.component';
import { ImagesModule } from '../images/images.module';
import { BurgerMenuComponent } from './components/burger-menu/burger-menu.component';



@NgModule({
  declarations: [
    LabeledInputComponent,
    OkCancelComponent,
    UsersButtonComponent,
    HeaderComponent,
    FooterComponent,
    DealListViewComponent,
    DealListComponent,
    BurgerMenuComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    LocalizationModule,
    ImagesModule
  ],
  exports: [
    LabeledInputComponent,
    OkCancelComponent,
    UsersButtonComponent,
    HeaderComponent,
    FooterComponent,
    DealListViewComponent,
    DealListComponent,
    BurgerMenuComponent,
  ]
})
export class CommonComponentsModule { }
