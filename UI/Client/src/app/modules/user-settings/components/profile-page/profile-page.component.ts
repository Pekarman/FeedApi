import { Component, OnInit } from '@angular/core';
import { SessionService } from "src/app/services/session.service";
import { DealListFilter } from '../../../common/components/deal-list/DealListFilter';
import { UserService } from 'src/app/services/user.service';

enum InformationType {
  CommonInfo = 1,
  AdditionalInfo = 2,
  YourDeals = 3,
  TrackedDeals = 4,
  MyPurchases= 5,
  MySales = 6,
  MyFinance = 7
}

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  localePath: string = "Pages/ProfilePage/";

  InformationType = InformationType;
  toggleInformationType: InformationType | null = null;
  user: any;

  constructor(private sessionService: SessionService, private readonly userService: UserService) {}

  getUserIdFilter(): DealListFilter {
    return {userId: this.user.id, categoryId: -1, watchUserId: -1, boughtUserId: -1, sellUserId: -1};
  }

  getWatchUserIdFilter(): DealListFilter {
    return {userId: -1, categoryId: -1, watchUserId: this.user.id, boughtUserId: -1, sellUserId: -1};
  }

  getBoughtUserIdFilter(): DealListFilter {
    return {userId: -1, categoryId: -1, watchUserId: -1, boughtUserId: this.user.id, sellUserId: -1};
  }

  getSellUserIdFilter(): DealListFilter {
    return {userId: -1, categoryId: -1, watchUserId: -1, boughtUserId: -1, sellUserId: this.user.id};
  }

  showOrHideInformation(type: InformationType): void {
    this.toggleInformationType = type;
  }

  ngOnInit(): void {
    this.user = this.sessionService.getSession().user;
    this.sessionService.getSessionAsync().subscribe((session: any) => {
      this.sessionService.setSession(session);
      this.user = session.user;
    });
    this.toggleInformationType = this.InformationType.CommonInfo;
  }
}
