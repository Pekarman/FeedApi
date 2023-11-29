import { Injectable } from '@angular/core';
import { ApiConfig } from '../configs/apiconfig';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDeal } from '../Models/IDeal';
import { IWatchDeal } from '../Models/IWatchDeal';

@Injectable({
  providedIn: 'root'
})
export class DealService {

  readonly APIUrl=new ApiConfig().ApiUrl;

  constructor(private http:HttpClient) { }

  createDeal(deal: IDeal): Observable<IDeal>{
    return this.http.put<IDeal>(this.APIUrl + 'Api/Deal', deal);
  }

  getAllDeals(): Observable<IDeal[]>{
    return this.http.get<IDeal[]>(this.APIUrl + 'Api/Deal');
  }

  getDeal(id: number): Observable<IDeal>{
    return this.http.get<IDeal>(this.APIUrl + `Api/Deal/${id}`);
  }

  changeDeal(deal:IDeal): Observable<IDeal>{
    return this.http.post<IDeal>(this.APIUrl + `Api/Deal/changeDeal`, deal);
  }

  addWatchDeal(watchDeal: IWatchDeal): Observable<IWatchDeal>{
    return this.http.post<IWatchDeal>(this.APIUrl + `Api/Deal/addWatchDeal`, watchDeal)
  }

  deleteWatchDeal(watchDeal: IWatchDeal):Observable<boolean>{
    return this.http.post<boolean>(this.APIUrl + `Api/Deal/deleteWatchDeal`, watchDeal)
  }
}
