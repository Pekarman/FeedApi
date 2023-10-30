import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from '../configs/apiconfig';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  
  readonly APIUrl=new ApiConfig().ApiUrl;

  constructor(private http:HttpClient) { }

  getArticlesList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl + 'Api/Article');
  }

  getAll():Observable<any[]>{
    return this.http.get<any>(this.APIUrl + 'Api/Items');
  }
}
