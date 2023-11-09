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
import { JsonPipe } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserSettingsComponent } from './components/userSettings/user-settings/user-settings.component';
import { UserEmailChangeComponent } from './components/userSettings/user-email-change/user-email-change.component';
import { UserPasswordChangeComponent } from './components/userSettings/user-password-change/user-password-change.component';
import { UserPhraseChangeComponent } from './components/userSettings/user-phrase-change/user-phrase-change.component';
import { DeleteUserComponent } from './components/userSettings/delete-user/delete-user.component';
import { LabeledInputComponent } from './components/common/labeled-input/labeled-input.component';
import { OkCancelComponent } from './components/common/ok-cancel/ok-cancel.component';
import { UsersButtonComponent } from './components/common/users-button/users-button.component';
import { ProfilePageComponent } from './components/profilePage/profile-page/profile-page.component';
import { DealListViewComponent } from './components/deal-list-view/deal-list-view.component';
import { DealListComponent } from './components/deal-list/deal-list.component';

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
    UserSettingsComponent,
    UserEmailChangeComponent,
    UserPasswordChangeComponent,
    UserPhraseChangeComponent,
    DeleteUserComponent,
    LabeledInputComponent,
    OkCancelComponent,
    UsersButtonComponent,
    ProfilePageComponent,
    DealListViewComponent,
    DealListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LocalizationModule
  ],
  providers: [
    ArticleHttpService,
    AuthService,
    SessionService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
