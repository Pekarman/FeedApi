import { Asset } from "./Asset";

export class Deal{
    id: number;
    productName: string;
    shortDesc: string;
    longDesc: string;
    categoryId: number;
    subcategoryId: number;
    uom: string;
    quantity:number;
    partNumber: string;
    priceBuyNow:number;
    canBuyNow: boolean;
    isChecked: boolean;
    userId: number;
    assets : Asset[];

    constructor(
        _id: number,
        _productName: string,
        _shortDesc: string,
        _longDesc: string,
        _categoryId: number,
        _subcategoryId: number,
        _uom: string,
        _quantity: number,
        _partNumber: string,
        _priceBuyNow:number,
        _canBuyNow: boolean,
        _isChecked: boolean,
        _userId: number,
        _assets: Asset[]
        )        {
        this.id = _id;
        this.productName = _productName;
        this.shortDesc = _shortDesc;
        this.longDesc = _longDesc;
        this.categoryId = _categoryId;
        this.subcategoryId = _subcategoryId;
        this.uom = _uom;
        this.quantity = _quantity;
        this.partNumber = _partNumber;
        this.priceBuyNow = _priceBuyNow;
        this.canBuyNow = _canBuyNow;
        this.isChecked = _isChecked;
        this.userId = _userId;
        this.assets = _assets;
    }
}
