import { Injectable } from '@angular/core';
import { ApiConfig } from '../configs/apiconfig';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Deal } from '../Models/Deal';

@Injectable({
  providedIn: 'root'
})
export class DealService {

  readonly APIUrl=new ApiConfig().ApiUrl;

  constructor(private http:HttpClient) { }

  createDeal(deal: Deal): Observable<Deal>{
    return this.http.put<Deal>(this.APIUrl + 'Api/Deal', deal);
  }

  getAllDeals(): Observable<Deal[]>{    
    return this.http.get<Deal[]>(this.APIUrl + 'Api/Deal');
  }

  getDeal(id: number): Observable<Deal>{
    return this.http.get<Deal>(this.APIUrl + `Api/Deal/${id}`);
  }
}
