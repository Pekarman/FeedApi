import { IAsset } from "./IAsset";
import {IBet} from "src/app/Models/IBet";

export interface IDeal{
    id: number;
    productName: string;
    shortDesc: string;
    longDesc: string;
    categoryId: number;
    uoM: string;
    quantity: number;
    partNumber: string;
    pricebuynow: number;
    canBuyNow: boolean;
    startTime: Date;
    endTime: Date;
    isChecked: boolean;
    statusId: number;
    userId: number;
    bets: IBet[];
    assets : IAsset[];
}
