import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from '../configs/apiconfig';

@Injectable({
  providedIn: 'root'
})
export class ArticleHttpService {

  readonly APIUrl=new ApiConfig().ApiUrl;
  constructor(private http:HttpClient) { }

  getArticles(){
    return this.http.get<any>(this.APIUrl + 'Api/Article');
  }
}
