import { Injectable } from '@angular/core';
import { ApiConfig } from '../configs/apiconfig';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDeal } from '../Models/IDeal';
import { IWatchDeal } from '../Models/IWatchDeal';
import { IDealListFilter } from '../modules/common/components/deal-list/IDealListFilter';
import { IBet } from '../Models/IBet';

@Injectable({
  providedIn: 'root'
})
export class DealService {

  readonly APIUrl = new ApiConfig().ApiUrl;

  constructor(private http: HttpClient) {
  }

  createDeal(deal: IDeal): Observable<IDeal> {
    return this.http.put<IDeal>(this.APIUrl + 'Api/Deal', deal);
  }

  getAllDeals(): Observable<IDeal[]> {
    return this.http.get<IDeal[]>(this.APIUrl + 'Api/Deal');
  }

  getDeal(id: number): Observable<IDeal> {
    return this.http.get<IDeal>(this.APIUrl + `Api/Deal/${id}`);
  }

  getDealsByFilter(deal: IDealListFilter): Observable<IDeal[]>{
    return this.http.post<IDeal[]>(this.APIUrl + `Api/Deal/getDealByFilter`, deal);
  }

  changeDeal(deal:IDeal): Observable<IDeal>{
    return this.http.post<IDeal>(this.APIUrl + `Api/Deal/changeDeal`, deal);
  }

  makeBet(bet: IBet): Observable<IBet>{
    return this.http.post<IBet>(this.APIUrl + `Api/Deal/makeBet`, bet);
  }

  addWatchDeal(watchDeal: IWatchDeal): Observable<IWatchDeal> {
    return this.http.post<IWatchDeal>(this.APIUrl + `Api/Deal/addWatchDeal`, watchDeal)
  }

  deleteWatchDeal(watchDeal: IWatchDeal): Observable<boolean> {
    return this.http.post<boolean>(this.APIUrl + `Api/Deal/deleteWatchDeal`, watchDeal)
  }

  updateStatusActive(dealId: number): Observable<IDeal> {
    return this.http.get<IDeal>(this.APIUrl + `Api/Deal/moveToActiveStatus/${dealId}`)
  }
}
