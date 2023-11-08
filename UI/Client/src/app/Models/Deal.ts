export class Deal{
    id: number;
    productName: string;
    shortDesc: string;
    longDesc: string;
    categoryId: number;
    subcategoryId: number;
    uom: string;
    partNumber: string;
    isChecked: boolean;
    userOwnerId: number;

    constructor(
        _id: number,
        _productName: string,
        _shortDesc: string,
        _longDesc: string,
        _categoryId: number,
        _subcategoryId: number,
        _uom: string,
        _partNumber: string,
        _isChecked: boolean,
        _userOwnerId: number,
        )        {
        this.id = _id;
        this.productName = _productName;
        this.shortDesc = _shortDesc;
        this.longDesc = _longDesc;
        this.categoryId = _categoryId;
        this.subcategoryId = _subcategoryId;
        this.uom = _uom;
        this.partNumber = _partNumber;
        this.isChecked = _isChecked;
        this.userOwnerId = _userOwnerId;
    }
}