// profile-page.component.ts
import { Component, OnInit } from '@angular/core';
import { IDeal } from 'src/app/Models/IDeal';
import { SessionService } from "src/app/services/session.service";
import { IDealListFilter } from '../../../common/components/deal-list/IDealListFilter';

enum InformationType {
  CommonInfo = 1,
  AdditionalInfo = 2,
  YourDeals = 3,
  TrackedDeals = 4
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

  getUserIdFilter(): IDealListFilter {
    return {userId: this.user.id, categoryId: -1, watchUserId: -1};
  }
  
  getWatchUserIdFilter(): IDealListFilter {
    return {userId: -1, categoryId: -1, watchUserId: 1};
  }
  
  constructor(private sessionService: SessionService) {}

  showOrHideInformation(type: InformationType): void {
    this.toggleInformationType = type;
  }

  ngOnInit(): void {
    this.user = this.sessionService.getSession().user;
    this.toggleInformationType = this.InformationType.CommonInfo;
  }
}
