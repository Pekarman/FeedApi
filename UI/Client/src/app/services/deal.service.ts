import { Injectable } from '@angular/core';
import ApiConfig from '../configs/apiconfig.json';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDeal } from '../Models/IDeal';
import { IWatchDeal } from '../Models/IWatchDeal';
import { DealListFilter } from '../modules/common/components/deal-list/DealListFilter';
import { IBet } from '../Models/IBet';
import { ISell } from '../Models/ISell';
import { IAutoBet } from '../Models/IAutoBet';
import { IAuction } from '../Models/IAuction';
import { SpinnerService } from '../modules/spinner/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class DealService {

  readonly APIUrl = ApiConfig.ApiUrl;

  constructor(
    private http: HttpClient,
    private readonly spinnerService: SpinnerService,
    ) {}

  createDeal(deal: IDeal): Observable<IDeal> {
    return this.http.put<IDeal>(this.APIUrl + 'Api/Deal', deal);
  }

  getAllDeals(): Observable<IDeal[]> {
    return this.http.get<IDeal[]>(this.APIUrl + 'Api/Deal');
  }

  getAuction(id: number): Observable<IAuction> {
    return this.http.get<IAuction>(this.APIUrl + `Api/Deal/GetAuctionByDealId/${id}`);
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

  deleteDeal(deal:IDeal): Observable<any>{
    return this.http.post<any>(this.APIUrl + `Api/Deal/deleteDeal`, deal);
  }

  makeBet(bet: IBet): Observable<IAuction>{
    return this.spinnerService.wrap(this.http.post<IAuction>(this.APIUrl + `Api/Deal/makeBet`, bet));
  }

  setAutoBet(autoBet: IAutoBet): Observable<IAuction> {
    return this.http.post<IAuction>(this.APIUrl + `Api/Deal/setAutoBet`, autoBet);
  }

  cancelAutoBet(autoBet: IAutoBet): Observable<IAuction> {
    return this.http.post<IAuction>(this.APIUrl + `Api/Deal/cancelAutoBet`, autoBet);
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
