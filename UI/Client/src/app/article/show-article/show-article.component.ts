import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-article',
  templateUrl: './show-article.component.html',
  styleUrls: ['./show-article.component.css']
})
export class ShowArticleComponent implements OnInit {

  constructor(private service:SharedService) { }

  ArticleList:any=[];

  ngOnInit(): void {
    this.refreshArticleList();
  }

  refreshArticleList(){
    this.service.getArticlesList().subscribe(data=>{
      this.ArticleList=data;

    });
  }

}
