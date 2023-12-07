import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleHttpService } from './services/article.http.service';

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
    CommonComponentsModule
  ],
  providers: [
    ArticleHttpService,
    AuthService,
    SessionService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
