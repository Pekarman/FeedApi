import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoryEnum} from 'src/app/enums/CategoryEnum'
import {DealService} from "src/app/services/deal.service";
import {IDeal} from "src/app/Models/IDeal";
import {SessionService} from 'src/app/services/session.service';
import {ActivatedRoute, Router} from "@angular/router";
import { Observable } from 'rxjs';
import { SpinnerService } from 'src/app/modules/spinner/spinner.service';

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
    canBuyNow: new FormControl(true, [Validators.required, Validators.minLength(1)]),
    priceBuyNow: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/), Validators.minLength(1)]),
    startTime: new FormControl('', [Validators.required, Validators.minLength(1)]),
    startDate: new FormControl('', [Validators.required, Validators.minLength(1)]),
    duration: new FormControl('', [Validators.required, Validators.minLength(1)]),
    startBet: new FormControl('', [Validators.required, Validators.minLength(1)]),

  });

  public dealFlag: boolean = false;

  public getControl(controlName: string): FormControl {
    return this.myForm.controls[controlName] as FormControl;
  }

  allValues = Object.values(CategoryEnum).filter(el => el !== Number(el));
  visibilityPriceBuyNow: boolean = false;

  localePath: string = 'Pages/AddDeals/'
  ValidationRequiredError: string = 'Errors/ValidationErrors/FieldIsRequiredError'

  constructor(
    private readonly dealService: DealService,
    private readonly sessionServise: SessionService,
    private readonly spinnerService: SpinnerService,
    private route: ActivatedRoute,
    private router:Router,
  ) {

  }

  ngOnInit(): void {
    this.fillForm()
  }

  fillForm() {
    const id = this.route.snapshot.params.id as unknown as number;
    this.spinnerService.wrap(this.dealService.getDeal(id)).subscribe(response => {
      if (response) {
        this.dealFlag = true;

        let stringFromStartTime = String(response.startTime).split("").slice(11, 16).join('');
        
        var date = new Date();

        date.setUTCHours(stringFromStartTime.split(':')[0] as unknown as number);
        date.setMinutes(stringFromStartTime.split(':')[1] as unknown as number);

        let minutes = date.getMinutes().toString();

        let stringFromStartTimeNew = `${date.getHours().toString()}:${minutes.length == 1 ? `0${minutes}` : minutes}`;
        let stringFromStartTimeToStartDateNew = String(response.startTime).split("").slice(0, 10).join('')

        this.myForm.patchValue({
          prodName: response.productName,
          shortDescription: response.shortDesc,
          longDescription: response.longDesc,
          category: response.categoryId || this.allValues[0],
          partNumber: response.partNumber,
          uom: response.uoM,
          quantity: response.quantity || 1,
          canBuyNow: response.canBuyNow || false,
          priceBuyNow: response.priceBuyNow || 0,
          startTime: stringFromStartTimeNew,
          startDate: stringFromStartTimeToStartDateNew,
          duration: response.duration,
          startBet: response.startBet,
        })
      }
    })
  }

  onSubmit(form: FormGroup) {
    this.processDeal(form);
  }

  processDeal(form: FormGroup) {
    if (form.invalid) {
      form.markAllAsTouched();
      return;
    }

    var startTime = (form.controls.startTime.value as string).split(':');
    var startDateTime = new Date(form.controls.startDate.value);
    startDateTime.setHours(0);
    startDateTime.setHours(Number(startTime[0]), Number(startTime[1]));

    const deal: IDeal = {
      id: this.dealFlag ? Number(this.route.snapshot.params.id) : 0,
      productName: form.controls.prodName.value,
      shortDesc: form.controls.shortDescription.value,
      longDesc: form.controls.longDescription.value,
      categoryId: form.controls.category.value,
      uoM: form.controls.uom.value,
      quantity: form.controls.quantity.value || 1,
      partNumber: form.controls.partNumber.value,
      priceBuyNow: form.controls.priceBuyNow.value || 0,
      canBuyNow: form.controls.canBuyNow.value || false,
      startTime: new Date(startDateTime),
      duration: form.controls.duration.value || 0,
      isChecked: false,
      statusId: 0,
      userId: this.sessionServise.getSession().userId,
      userFullName: "",
      startBet: form.controls.startBet.value,
      bets: null,
      assets: null,
      watchDeals: null,
    };

    var subscription: Observable<IDeal> = this.dealFlag? this.dealService.changeDeal(deal) : this.dealService.createDeal(deal);

    subscription.subscribe(deal => {
      this.router.navigate([`deal/${deal.id}`]);
    });
  }
}
