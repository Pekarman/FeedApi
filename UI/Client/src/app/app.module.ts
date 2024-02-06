import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { SessionService } from './services/session.service';
import { LocalizationModule } from './localization/localization.module';
import { ImagesModule } from './modules/images/images.module';
import { UserSettingsModule } from './modules/user-settings/user-settings.module';
import { CommonComponentsModule } from './modules/common/common-components.module';
import { DealsModule } from './modules/deals/deals.module';
import { LoginModule } from './modules/login/login.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalService } from './services/modal.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SpinnerModule } from './modules/spinner/spinner.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LocalizationModule,
    LoginModule,
    ImagesModule,
    DealsModule,
    DashboardModule,
    UserSettingsModule,
    CommonComponentsModule,
    BrowserAnimationsModule,
    SpinnerModule,
  ],
  providers: [
    AuthService,
    SessionService,
    ModalService,
    { provide: MatDialogRef, useValue: {}},
    { provide: MAT_DIALOG_DATA, useValue: {}},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
