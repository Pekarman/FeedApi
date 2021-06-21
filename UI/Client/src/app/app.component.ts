import { Component } from '@angular/core';
import { ArticleHttpService } from './services/article.http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ArticleHttpService]
})
export class AppComponent {
  
  title = 'Client';
  response: string = "default response";

  constructor(private httpService: ArticleHttpService){}

  submit(){
    this.httpService.getArticles().subscribe((data:any) => {
      this.response = data;
    })
  }
}
