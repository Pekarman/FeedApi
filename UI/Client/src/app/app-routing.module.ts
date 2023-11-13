import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArticleComponent } from './components/article/article.component';
import { ArticleList } from './components/article-list/article-list.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {UserSettingsComponent} from "src/app/components/userSettings/user-settings/user-settings.component";
import {UserEmailChangeComponent} from "src/app/components/userSettings/user-email-change/user-email-change.component";
import {
  UserPasswordChangeComponent
} from "src/app/components/userSettings/user-password-change/user-password-change.component";
import {
  UserPhraseChangeComponent
} from "src/app/components/userSettings/user-phrase-change/user-phrase-change.component";
import {DeleteUserComponent} from "src/app/components/userSettings/delete-user/delete-user.component";
import {ProfilePageComponent} from "src/app/components/profilePage/profile-page/profile-page.component";
import { DealComponent } from './components/deal/deal.component';
import {IsLogedInGuard} from "src/app/guards/is-loged-in.guard";

const routes: Routes = [
  {path: 'article', component:ArticleComponent},
  {path: 'show-article', component:ArticleList},
  {path: 'login', component:LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: '', component:DashboardComponent},
  {path: 'deal/:id', component:DealComponent},
  {path: 'userSettings', component:UserSettingsComponent, canActivate: [IsLogedInGuard]},
  {path: 'userSettings/changeEmail', component:UserEmailChangeComponent, canActivate: [IsLogedInGuard]},
  {path: 'userSettings/changePassword', component:UserPasswordChangeComponent, canActivate: [IsLogedInGuard]},
  {path: 'userSettings/changePhrase', component:UserPhraseChangeComponent, canActivate: [IsLogedInGuard]},
  {path: 'userSettings/deleteUser', component:DeleteUserComponent, canActivate: [IsLogedInGuard]},
  {path: 'profilePage', component:ProfilePageComponent, canActivate: [IsLogedInGuard]},
  { path: '**',
    redirectTo: '',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
