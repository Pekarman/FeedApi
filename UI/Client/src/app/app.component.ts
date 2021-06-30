import { Component, Input } from '@angular/core';
import { ArticleHttpService } from './services/article.http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ArticleHttpService]
})
export class AppComponent {  

  constructor(){}

  searchValue: string = "";

  changeSearchValue(value : string){
    this.searchValue = value;
    console.log(value);
  }
}