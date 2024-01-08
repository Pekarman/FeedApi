import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IUserRegister} from 'src/app/Models/IUserRegister';
import {AuthService} from 'src/app/services/auth.service';
import {SessionService} from 'src/app/services/session.service';
import {UserService} from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class RegisterComponent implements OnInit {

  myForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    userName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern('^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*"]).*$')]),
    password2: new FormControl('', [Validators.required]),
    phrase: new FormControl('', [Validators.required]),
    phrase2: new FormControl('', [Validators.required]),
  });

  localePath: string = "Pages/RegisterPage/"

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private sessionService: SessionService
  ) {
  }

  notSamePassword: boolean = false;
  notSamePhrase: boolean = false;
  text:string = 'text';
  password:string = 'password';

  invalidEmailError: boolean = false;
  invalidPasswordError: boolean = false;
  passwordMatchesError: boolean = false;
  phraseMatchesError: boolean = false;

  invalidResponseError: boolean = false;
  errorText: string = '';
  isShowOrHidePassword: boolean = false;
  isShowOrHideReplPassword: boolean = false;
  isShowOrHideSecretPhrase: boolean = false;
  isShowOrHideReplSecretPhrase: boolean = false;

  getControl(name: string) {
    return this.myForm.controls[name];
  }

  togglePhrasesVisibility(phrase: string) {
   switch (phrase){
     case 'Password':
       this.isShowOrHidePassword = !this.isShowOrHidePassword;
       break
     case 'ReplPassword':
       this.isShowOrHideReplPassword = !this.isShowOrHideReplPassword;
       break
     case 'SecretPhrase':
       this.isShowOrHideSecretPhrase = !this.isShowOrHideSecretPhrase;
       break
     case 'ReplSecretPhrase':
       this.isShowOrHideReplSecretPhrase = !this.isShowOrHideReplSecretPhrase;
       break
     default:
       alert(phrase)
   }
  }

  ngOnInit(): void {
  }

  onSubmit(form: FormGroup) {
    this.myForm.updateValueAndValidity();
    this.validateForm(form);

    if (!this.myForm.valid) return;

    const user: IUserRegister = {
      firstName: this.myForm.controls.firstName.value,
      lastName: this.myForm.controls.lastName.value,
      username: this.myForm.controls.userName.value,
      email: this.myForm.controls.email.value,
      password: this.myForm.controls.password.value,
      phrase: this.myForm.controls.phrase.value
    }

    this.userService.createUser(user)
      .subscribe((response: any) => {
        if (response.id) {
          this.authService.login(response.Email, user.password, user.phrase)
            .subscribe((response: any) => {
              this.sessionService.setSession(response);
            });

        } else {
          this.errorText = response;
          this.invalidResponseError = true;
        }
      });
  }

  validateForm(form: FormGroup) {
    this.invalidEmailError = !form.controls.email.valid;
    this.invalidPasswordError = !form.controls.password.valid;
    this.passwordMatchesError = form.controls.password.value !== form.controls.password2.value;
    this.phraseMatchesError = form.controls.phrase.value !== form.controls.phrase2.value;
  }
}
