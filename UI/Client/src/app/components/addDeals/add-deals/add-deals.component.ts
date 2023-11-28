import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoryEnum} from "src/app/enums/CategoryEnum";
import {DealService} from "src/app/services/deal.service";
import {IDeal} from "src/app/Models/IDeal";
import {SessionService} from 'src/app/services/session.service';

@Component({
  selector: 'app-add-deals',
  templateUrl: './add-deals.component.html',
  styleUrls: ['./add-deals.component.scss']
})
export class AddDealsComponent implements OnInit {
  myForm = new FormGroup({
    prodName: new FormControl('', [Validators.required, Validators.minLength(1)]),
    shortDescription: new FormControl('', [Validators.required, Validators.minLength(1)]),
    longDescription: new FormControl('', [Validators.required, Validators.minLength(1)]),
    category: new FormControl('', [Validators.required]),
    partNumber: new FormControl('', [Validators.required, Validators.minLength(1)]),
    uom: new FormControl('', [Validators.required, Validators.minLength(1)]),
    quantity: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/), Validators.minLength(1)]),
    canBuyNow: new FormControl('', [Validators.required, Validators.minLength(1)]),
    priceBuyNow: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/), Validators.minLength(1)]),
    startTime: new FormControl('', [Validators.required, Validators.minLength(1)]),
    startDate: new FormControl('', [Validators.required, Validators.minLength(1)]),
    duration: new FormControl('', [Validators.required, Validators.minLength(1)]),
    minimalBet: new FormControl('', [Validators.required, Validators.minLength(1)]),

  });

  public getControl(controlName: string): FormControl {
    return this.myForm.controls[controlName] as FormControl;
  }

  allValues = Object.values(CategoryEnum).filter(el => el !== Number(el));
  visibilityPriceBuyNow: boolean = false;

  localePath: string ='Pages/AddDeals/'
  ValidationRequiredError: string ='Errors/ValidationErrors/FieldIsRequiredError'

  constructor(
    private readonly dealService: DealService,
    private readonly sessionServise: SessionService
  ) {

  }

  ngOnInit(): void {
    this.myForm.patchValue({
      category: this.allValues[0]
    });
  }

  togglePriceBuyNow() {
    this.visibilityPriceBuyNow = !this.visibilityPriceBuyNow
  }

  onSubmit(form: FormGroup) {
    debugger
    if (form.invalid) return;
    let durationTime = form.controls.startTime.value;

    let [hours, minutes] = durationTime.split(':').map((time: any) => Number(time));

    const durationMinutes = parseInt(form.controls.duration.value) || 0;

    minutes += durationMinutes;

    if (minutes > 59) {
      const additionalHours = Math.floor(minutes / 60);
      hours += additionalHours;
      minutes %= 60;
    }

    const endDateTime = new Date(form.controls.startDate.value)
      .setUTCHours(hours, minutes);



    var startTime = (form.controls.startTime.value as string).split(':');
    var startDateTime = new Date(form.controls.startDate.value)
      .setUTCHours(Number(startTime[0]), Number(startTime[1]));


    const deal: IDeal = {
      id: 0,
      productName: form.controls.prodName.value,
      shortDesc: form.controls.shortDescription.value,
      longDesc: form.controls.longDescription.value,
      categoryId: form.controls.category.value,
      uom: form.controls.uom.value,
      quantity: form.controls.quantity.value || 1,
      partNumber: form.controls.partNumber.value,
      pricebuynow: form.controls.priceBuyNow.value || 0,
      canBuyNow: form.controls.canBuyNow.value || false,
      startTime: new Date(startDateTime),
      endTime: new Date(endDateTime),
      isChecked: false,
      statusId: 0,
      userId: this.sessionServise.getSession().userId,
      bets: [],
      assets: []
    };

    this.dealService.createDeal(deal).subscribe(response => {
      debugger
      console.log(response);
    })
  }
}
