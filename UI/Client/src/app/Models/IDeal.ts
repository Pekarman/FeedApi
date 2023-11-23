import { Asset } from "./Asset";

export interface IDeal{
    id: number;
    productName: string;
    shortDesc: string;
    longDesc: string;
    categoryId: number;
    uom: string;
    quantity: number;
    partNumber: string;
    pricebuynow: number;
    canBuyNow: boolean;
    startTime: Date;
    endTime: Date;
    isChecked: boolean;
    statusId: number;
    userId: number;
    assets : Asset[];
}
