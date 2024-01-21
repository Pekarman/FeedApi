import { Time } from "@angular/common";
import { IAutoBet } from "./IAutoBet";
import { IBet } from "./IBet";

export interface IAuction {
    id: number;
    dealId: number;
    userId: number;
    bets: IBet[];
    autoBets: IAutoBet[];
    auctionStart: Date;
    auctionLength: number;
    auctionEnd: Date;
}