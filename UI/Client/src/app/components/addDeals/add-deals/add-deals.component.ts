import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EnumForAddDeals} from "src/app/enums/enumForAddDeals";
import {DealService} from "src/app/services/deal.service";
import {Deal} from "src/app/Models/Deal";

@Component({
  selector: 'app-add-deals',
  templateUrl: './add-deals.component.html',
  styleUrls: ['./add-deals.component.scss']
})
export class AddDealsComponent implements OnInit {
  myForm = new FormGroup({
    prodName: new FormControl('', [Validators.required]),
    shortDescription: new FormControl('', [Validators.required]),
    longDescription: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    partNumber: new FormControl('', [Validators.required]),
    uom: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
    canBuyNow: new FormControl('', [Validators.required]),
    priceBuyNow: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
    startTime: new FormControl('', [Validators.required]),
    endTime: new FormControl('', [Validators.required])
  });

  allValues = Object.values(EnumForAddDeals).filter(el => el !== Number(el));
  priceBuyNow: boolean = false;
  constructor(private dealService: DealService){
  }
  togglePriceBuyNow (){
    this.priceBuyNow = !this.priceBuyNow
  }
  onSubmit(form: FormGroup){
    const deals = new Deal(
      this.myForm.controls.prodName.value,
      this.myForm.controls.shortDescription.value,
      this.myForm.controls.longDescription.value,
      this.myForm.controls.category.value.toNumber(),
      this.myForm.controls.partNumber.value,
      this.myForm.controls.uom.value,
      this.myForm.controls.quantity.value,
      this.myForm.controls.canBuyNow.value,
      this.myForm.controls.priceBuyNow.value,
      this.myForm.controls.startTime.value,
      this.myForm.controls.endTime.value,
      false,
      3,
      [{id:3, deallId:1, imageName: '',  imageData: ''}]
    )
    this.dealService.createDeal(deals).subscribe(response => {
      debugger
      console.log(1)
    })
    // console.log(this.myForm.value)
  }
  ngOnInit(): void {
    this.myForm.patchValue({
      category: this.allValues[0]
    });
  }

  // protected readonly EnumForAddDeals = EnumForAddDeals;

}
