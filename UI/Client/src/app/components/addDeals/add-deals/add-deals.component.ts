import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoryEnum} from "src/app/enums/CategoryEnum";
import {DealService} from "src/app/services/deal.service";
import {IDeal} from "src/app/Models/IDeal";
import { SessionService } from 'src/app/services/session.service';

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
    startDate: new FormControl('', [Validators.required]),
    endTime: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required])
  });

  allValues = Object.values(CategoryEnum).filter(el => el !== Number(el));
  priceBuyNow: boolean = false;

  constructor(
    private readonly dealService: DealService,
    private readonly sessionServise: SessionService
    ){
  }
  
  ngOnInit(): void {
    this.myForm.patchValue({
      category: this.allValues[0]
    });
  }

  togglePriceBuyNow (){
    this.priceBuyNow = !this.priceBuyNow
  }

  onSubmit(form: FormGroup){
    var startTime = (form.controls.startTime.value as string).split(':');
    var startDateTime = new Date(form.controls.startDate.value)
      .setUTCHours(Number(startTime[0]), Number(startTime[1]));
      
    var endTime = (form.controls.endTime.value as string).split(':');
    var endDateTime = new Date(form.controls.endDate.value)
      .setUTCHours(Number(endTime[0]), Number(endTime[1]));

    const deal: IDeal = {
      id: 0,
      productName: form.controls.prodName.value,
      shortDesc: form.controls.shortDescription.value,
      longDesc: form.controls.longDescription.value,
      categoryId: form.controls.category.value,
      uom: form.controls.uom.value,
      quantity: form.controls.quantity.value || 1,
      partNumber: form.controls.partNumber.value,
      canBuyNow: form.controls.canBuyNow.value || false,
      pricebuynow: form.controls.priceBuyNow.value || 0,
      startTime: new Date(startDateTime),
      endTime: new Date(endDateTime),
      userId: this.sessionServise.getSession().userId,
      isChecked: false,
      statusId: 0,
      assets: []
    };

    this.dealService.createDeal(deal).subscribe(response => {
      debugger
      console.log(response);
    })
  }
}
