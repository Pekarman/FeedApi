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
import { CommonComponentsModule } from 'src/app/components/common/common-components.module';



@NgModule({
  declarations: [
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
    CommonComponentsModule
  ],
  exports: [
    UserSettingsComponent,
    UserEmailChangeComponent,
    UserPasswordChangeComponent,
    UserPhraseChangeComponent,
    DeleteUserComponent
  ]
})
export class UserSettingsModule { }
