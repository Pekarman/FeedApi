import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from 'src/app/modules/login/components/register/register.component';
import { LoginComponent } from 'src/app/modules/login/components/login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { LocalizationModule } from 'src/app/localization/localization.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonComponentsModule } from '../common/common-components.module';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
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
    LoginComponent,
    RegisterComponent,
  ]
})
export class LoginModule { }
