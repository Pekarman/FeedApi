import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedService } from './services/shared.service';
import { ArticleHttpService } from './services/article.http.service';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticleComponent } from './components/article/article.component';
import { ShowArticleComponent } from './components/article-list/show-article.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    ShowArticleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ArticleHttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
