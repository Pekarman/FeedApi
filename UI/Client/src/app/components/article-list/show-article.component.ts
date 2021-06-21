import { Component, Input, OnInit } from '@angular/core';
import { ArticleHttpService } from 'src/app/services/article.http.service';
import { Article } from 'src/app/Models/Article';

@Component({
  selector: 'app-show-article',
  templateUrl: './show-article.component.html',
  styleUrls: ['./show-article.component.css']
})

export class ShowArticleComponent implements OnInit {

  constructor(private service: ArticleHttpService) {
   }

  @Input()
  ArticleList: Article[] = [];

  ngOnInit(): void {
    this.refreshArticleList();
  }

  refreshArticleList(){
    this.service.getArticles().subscribe(data => {
      this.ArticleList = data;
    });
  }

}
