import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, NgModel, Validators} from "@angular/forms";
import {AuthService} from "src/app/services/auth.service";
import {SessionService} from "src/app/services/session.service";

@Component({
  selector: 'app-labeled-input',
  templateUrl: './labeled-input.component.html',
  styleUrls: ['./labeled-input.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class LabeledInputComponent implements OnInit {
  @Input() label: string = '';
  @Input() ngModel: any = '';
  @Input() control!: any;
  @Input() isPasswordField: boolean = true;


  isShowPassword: boolean = true;
  text: string = 'text';
  password: string = 'password';

  togglePassword() {
    this.isShowPassword = !this.isShowPassword;
  }
  inputValue: string = '';

  clearInput() {
    this.inputValue = '';
  }

  constructor() {
  }


  ngOnInit(): void {
    
  }

}
