import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
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
    password: new FormControl('', [Validators.required]),
    phrase: new FormControl('', [Validators.required, Validators.pattern('')]),
  });

  invalidEmailError: boolean = false;
  invalidPasswordError: boolean = false;
  invalidPhraseError: boolean = false;

  dataError: boolean = false;
  loginError: boolean = false;
  errorText: string = "";

  isShowOrHideValueInputPassword: boolean = false;
  isShowOrHideValueInputPhrase: boolean = false;
  text:string = 'text';
  password:string = 'password';
  localePath:string ='Pages/LoginPage/'

  constructor(
    private authService: AuthService,
    private sessionService: SessionService,
    private router: Router
    ) {
  }

  ngOnInit(): void {
  }

  onSubmit(form: FormGroup) {
    this.validateForm(form);
    if (form.status == "INVALID") return;
    this.authService.login(form.controls.email.value, form.controls.password.value, form.controls.phrase.value)
      .subscribe((response: any) => {
        if (response.user) {
          this.sessionService.setSession(response);
          this.router.navigate(['/']);
        } else {
          this.loginError = true;
          this.errorText = response;
        }        
      });
      setTimeout(() => {
        this.loginError = false;
      }, 5000);
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
