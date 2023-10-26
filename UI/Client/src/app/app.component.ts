import { Component, Input } from '@angular/core';
import { ArticleHttpService } from './services/article.http.service';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ArticleHttpService]
})
export class AppComponent {  

  constructor(private service: SharedService){}

  searchValue: string = "";

  changeSearchValue(value : string){
    this.searchValue = value;
    console.log(value);
  }

  ngOnInit(): void {
    this.refreshArticleList();
  }

  
  refreshArticleList() {
    var result = this.service.getAll().subscribe((result) => {
      console.log(result);
    });
    
  }
}