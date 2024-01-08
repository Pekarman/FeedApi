import { Injectable } from '@angular/core';
import { ApiConfig } from '../configs/apiconfig';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDeal } from '../Models/IDeal';
import { IWatchDeal } from '../Models/IWatchDeal';
import { DealListFilter } from '../modules/common/components/deal-list/DealListFilter';
import { IBet } from '../Models/IBet';
import { ISell } from '../Models/ISell';

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

  getDealsByFilter(deal: DealListFilter): Observable<IDeal[]>{
    return this.http.post<IDeal[]>(this.APIUrl + `Api/Deal/getDealByFilter`, deal);
  }

  changeDeal(deal:IDeal): Observable<IDeal>{
    return this.http.post<IDeal>(this.APIUrl + `Api/Deal/changeDeal`, deal);
  }

  makeBet(bet: IBet): Observable<IBet>{
    return this.http.post<IBet>(this.APIUrl + `Api/Deal/makeBet`, bet);
  }

  buyNow(sell: ISell): Observable<ISell>{
    return this.http.post<ISell>(this.APIUrl + `Api/Deal/buyNow`, sell);
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
