import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './modules/login/components/login/login.component';
import {RegisterComponent} from './modules/login/components/register/register.component';
import {DashboardComponent} from './modules/dashboard/components/dashboard/dashboard.component';
import {ProfilePageComponent} from "src/app/modules/user-settings/components/profile-page/profile-page.component";
import {DealComponent} from './modules/deals/components/deal/deal.component';
import {IsLoggedInGuard} from "src/app/guards/is-logged-in.guard";
import {AddDealsComponent} from "src/app/modules/deals/components/add-deals/add-deals.component";
import { UserSettingsComponent } from './modules/user-settings/components/user-settings/user-settings.component';
import { DeleteUserComponent } from './modules/user-settings/components/delete-user/delete-user.component';
import { UserPhraseChangeComponent } from './modules/user-settings/components/user-phrase-change/user-phrase-change.component';
import { UserPasswordChangeComponent } from './modules/user-settings/components/user-password-change/user-password-change.component';
import { UserEmailChangeComponent } from './modules/user-settings/components/user-email-change/user-email-change.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', component: DashboardComponent},
  {path: 'deal/:id', component: DealComponent},
  {path: 'userSettings', component: UserSettingsComponent, canActivate: [IsLoggedInGuard]},
  {path: 'userSettings/changeEmail', component: UserEmailChangeComponent, canActivate: [IsLoggedInGuard]},
  {path: 'userSettings/changePassword', component: UserPasswordChangeComponent, canActivate: [IsLoggedInGuard]},
  {path: 'userSettings/changePhrase', component: UserPhraseChangeComponent, canActivate: [IsLoggedInGuard]},
  {path: 'userSettings/deleteUser', component: DeleteUserComponent, canActivate: [IsLoggedInGuard]},
  {path: 'profilePage', component: ProfilePageComponent, canActivate: [IsLoggedInGuard]},
  {path: 'addDeal', component: AddDealsComponent, canActivate: [IsLoggedInGuard]},
  {path: 'changeDeal/:id', component: AddDealsComponent, canActivate: [IsLoggedInGuard]},
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
