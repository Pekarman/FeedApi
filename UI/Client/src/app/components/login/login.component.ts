import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, NgForm, RequiredValidator, Validators} from '@angular/forms';
import {AuthService} from 'src/app/services/auth.service';
import {SessionService} from 'src/app/services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})

export class LoginComponent implements OnInit {

  myForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern('^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$')]),
    phrase: new FormControl('', [Validators.required, Validators.pattern('')]),
    rememberMe: new FormControl('', [Validators.required]),
  });

  invalidEmailError: boolean = false;
  invalidPasswordError: boolean = false;
  invalidPhraseError: boolean = false;

  dataError: boolean = false;
  loginError: boolean = false;

  isShowOrHideValueInputPassword: boolean = false;
  isShowOrHideValueInputPhrase: boolean = false;
  text:string = 'text';
  password:string = 'password';

  constructor(private authService: AuthService, private sessionService: SessionService) {
  }

  ngOnInit(): void {
  }

  onSubmit(form: FormGroup) {
    this.validateForm(form);
    // debugger;
    this.authService.login(form.controls.email.value, form.controls.password.value, form.controls.phrase.value)
      .subscribe((response: any) => {
        // debugger;
        this.sessionService.setSession(response);
      });
    // if (form.valid)
    // console.log(form);
  }

  togglePasswordVisibility() {
    this.isShowOrHideValueInputPassword = !this.isShowOrHideValueInputPassword;
  }
  togglePhraseVisibility(){
    this.isShowOrHideValueInputPhrase = !this.isShowOrHideValueInputPhrase;
  }

  validateForm(form: FormGroup) {
    this.invalidEmailError = !form.controls.email.valid;
    this.invalidPasswordError = !form.controls.password.valid;
    this.invalidPhraseError = !form.controls.phrase.valid;
  }
}
