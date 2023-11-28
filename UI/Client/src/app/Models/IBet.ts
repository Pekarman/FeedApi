import { IAsset } from "./IAsset";

export interface IBet{
  id: number;
  dealId: number;
  userId: number;
  currentBet: number;
  timestamp: Date;
}
