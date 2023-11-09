import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {SessionService} from "src/app/services/session.service";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  flagForCommonInfo: boolean = false;
  flagForAdditionalInfo: boolean = false;
  user!: any;
  firstName: string = '';
  lastName: string = '';
  userName: string = '';
  userEmail: string = '';
  userPhone: string = '';
  userType!: any;
  companyName: string = '';
  passportNumber: string = '';
  payerRegNumber: string = '';
  bankAccount: string = '';
  bankCode: string = '';
  balance: string = '';
  isActive: string = '';
  userLocale: string = '';
  typeName: string = '';


  constructor(private router: Router, private sessionService: SessionService) {
  }

  // goBack() {
  //   this.router.navigate(['/'])
  // }

  commonInfo() {
    this.flagForCommonInfo = !this.flagForCommonInfo;
    this.flagForAdditionalInfo = false;
    this.firstName = this.user.firstName;
    this.lastName = this.user.lastName;
    this.userEmail = this.user.email;
    this.userName = this.user.username;
    this.userPhone = this.user.userPhone;
    this.typeName = this.user.userType.typeName
    console.log(this.user)

  }

  additionalInfo() {
    this.flagForAdditionalInfo = !this.flagForAdditionalInfo;
    this.flagForCommonInfo = false;
    this.companyName = this.user.companyName;
    this.passportNumber = this.user.passportNumber;
    this.payerRegNumber = this.user.payerRegNumber;
    this.bankAccount = this.user.bankAccount;
    this.bankCode = this.user.bankCode;
    this.balance = this.user.balance;
    this.isActive = this.user.isActive;
    this.userLocale = this.user.locale;

  }

  ngOnInit(): void {
    this.user = this.sessionService.getSession().user
  }

}
