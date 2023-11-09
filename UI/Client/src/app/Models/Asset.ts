export class Asset{
    id: number;
    deallId: number;
    imageName: string;
    imageData: string;


    constructor(
        _id: number,
        _deallId: number,
        _imageName: string,
        _imageData: string,
        )        {
        this.id = _id;
        this.deallId =_deallId;
        this.imageName = _imageName;
        this.imageData = _imageData;
    }
}