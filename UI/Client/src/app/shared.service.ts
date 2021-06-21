import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl="https://localhost:44341/Api"

  constructor(private http:HttpClient) { }

  getArticlesList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl + '/Article');
  }
}
