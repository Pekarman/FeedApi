import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserRegister } from 'src/app/Models/UserRegister';
import { AuthService } from 'src/app/services/auth.service';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';

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
    password: new FormControl('', [Validators.required, Validators.pattern('^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$')]),
    password2: new FormControl('', [Validators.required]),
    phrase: new FormControl('', [Validators.required]),
    phrase2: new FormControl('', [Validators.required]),
  });

  localePath: string = "Pages/RegisterPage/"

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private sessionService: SessionService
    ) { }

  notSamePassword: boolean = false;
  notSamePhrase: boolean = false;

  invalidEmailError: boolean = false;
  invalidPasswordError: boolean = false;
  passwordMatchesError: boolean = false;
  phraseMatchesError: boolean = false;

  invalidResponseError: boolean = false;
  errorText: string = '';


  ngOnInit(): void {
  }

  onSubmit(form: FormGroup) {
    this.validateForm(form);

    if (!this.myForm.valid) return;

    var user = new UserRegister(
      this.myForm.controls.firstName.value,
      this.myForm.controls.lastName.value,
      this.myForm.controls.userName.value,
      this.myForm.controls.email.value,
      this.myForm.controls.password.value,
      this.myForm.controls.phrase.value
    );

    this.userService.createUser(user)
      .subscribe((response: any) => {
        if (response.id) {
          debugger;



          // this.authService.login(response.Email, form.controls.password.value, form.controls.phrase.value)
          // .subscribe((response: any) => {
          //   this.sessionService.setSession(response);
          // });

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
