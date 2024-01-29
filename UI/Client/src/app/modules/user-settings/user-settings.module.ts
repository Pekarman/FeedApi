import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { UserEmailChangeComponent } from './components/user-email-change/user-email-change.component';
import { UserPasswordChangeComponent } from './components/user-password-change/user-password-change.component';
import { UserPhraseChangeComponent } from './components/user-phrase-change/user-phrase-change.component';
import { DeleteUserComponent } from './components/delete-user/delete-user.component';
import { LocalizationModule } from 'src/app/localization/localization.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonComponentsModule } from 'src/app/modules/common/common-components.module';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    ProfilePageComponent,
    UserSettingsComponent,
    UserEmailChangeComponent,
    UserPasswordChangeComponent,
    UserPhraseChangeComponent,
    DeleteUserComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    LocalizationModule,
    CommonComponentsModule,
    MatTabsModule
  ],
  exports: [
    ProfilePageComponent,
    UserSettingsComponent,
    UserEmailChangeComponent,
    UserPasswordChangeComponent,
    UserPhraseChangeComponent,
    DeleteUserComponent
  ],
  providers: [
  ]
})
export class UserSettingsModule { }
