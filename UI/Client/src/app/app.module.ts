import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleHttpService } from './services/article.http.service';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticleComponent } from './components/article/article.component';
import { ArticleList } from './components/article-list/article-list.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthService } from './services/auth.service';
import { SessionService } from './services/session.service';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LocalizationModule } from './localization/localization.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfilePageComponent } from './components/profilePage/profile-page/profile-page.component';
import { DealListViewComponent } from './components/deal-list-view/deal-list-view.component';
import { DealListComponent } from './components/deal-list/deal-list.component';
import { DealComponent } from './components/deal/deal.component';
import { BettingComponent } from './components/betting/betting.component';
import { AddDealsComponent } from './components/addDeals/add-deals/add-deals.component';
import { ImagesModule } from './modules/images/images.module';
import { UserSettingsModule } from './modules/user-settings/user-settings.module';
import { CommonComponentsModule } from './components/common/common-components.module';

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    ArticleList,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ProfilePageComponent,
    DealListViewComponent,
    DealListComponent,
    DealComponent,
    BettingComponent,
    AddDealsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LocalizationModule,
    ImagesModule,
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
