import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from 'src/app/modules/common/common-components.module';
import { DealComponent } from './components/deal/deal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BettingComponent } from 'src/app/modules/deals/components/betting/betting.component';
import { LocalizationModule } from 'src/app/localization/localization.module';
import { AddDealsComponent } from './components/add-deals/add-deals.component';



@NgModule({
  declarations: [
    DealComponent,
    BettingComponent,
    AddDealsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LocalizationModule,
    CommonComponentsModule,
  ],
  exports: [
    DealComponent,
    BettingComponent,
    AddDealsComponent
  ]
})
export class DealsModule { }
