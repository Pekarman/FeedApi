import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabeledInputComponent } from './labeled-input/labeled-input.component';
import { OkCancelComponent } from './ok-cancel/ok-cancel.component';
import { UsersButtonComponent } from './users-button/users-button.component';
import { LocalizationModule } from 'src/app/localization/localization.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    LabeledInputComponent,
    OkCancelComponent,
    UsersButtonComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    LocalizationModule,
  ],
  exports: [
    LabeledInputComponent,
    OkCancelComponent,
    UsersButtonComponent
  ]
})
export class CommonComponentsModule { }
