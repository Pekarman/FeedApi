import { IAsset } from "./IAsset";
import { IBet } from "./IBet";
import { IWatchDeal } from "./IWatchDeal";

export interface IDeal{
    id: number;
    productName: string;
    shortDesc: string;
    longDesc: string;
    categoryId: number;
    uoM: string;
    quantity: number;
    partNumber: string;
    priceBuyNow: number;
    canBuyNow: boolean;
    startTime: Date;
    endTime: Date;
    isChecked: boolean;
    statusId: number;
    userId: number;
    startBet: number;
    bets: IBet[] | null;
    watchDeals: IWatchDeal[] | null;
    assets : IAsset[] | null;
}
