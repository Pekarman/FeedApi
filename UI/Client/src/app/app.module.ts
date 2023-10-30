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

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    ArticleList,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
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
