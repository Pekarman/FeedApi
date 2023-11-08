import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "src/app/services/auth.service";
import {SessionService} from "src/app/services/session.service";
import {ChangePassword} from "src/app/Models/ChangePassword";
import {UserService} from "src/app/services/user.service";
import {Router} from "@angular/router";
import {ChangeEmail} from "src/app/Models/ChangeEmail";

@Component({
  selector: 'app-user-email-change',
  templateUrl: './user-email-change.component.html',
  styleUrls: ['./user-email-change.component.scss']
})
export class UserEmailChangeComponent implements OnInit {
  locale: any;
  localePath: string = "Pages/UserSettings/ChangeEmailSettings/";
  responseError: string = '';

  myForm = new FormGroup({
    password: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  invalidEmailError: boolean = false;
  invalidPasswordError: boolean = false;
  invalidPhraseError: boolean = false;

  constructor(private userService: UserService, private sessionService: SessionService, private router: Router) {
  }

  onSubmit(form: FormGroup) {
    alert(1)
    const data = new ChangeEmail(this.myForm.controls.password.value, this.myForm.controls.email.value, this.locale?.user?.username);
    debugger
    this.userService.changeEmail(data).subscribe(response => {
      debugger
      if (response.value) {
        this.router.navigate(['/userSettings'], {
          state: {response: response}
        });
      } else {
        this.responseError = response;
      }
    });
    setTimeout(() => {
      this.responseError = '';
    }, 3000)


  }

  validateForm(form: FormGroup) {
    this.invalidEmailError = !form.controls.email.valid;
    this.invalidPasswordError = !form.controls.password.valid;
    this.invalidPhraseError = !form.controls.phrase.valid;
  }

  ngOnInit(): void {
    this.locale = this.sessionService.getSession();
  }

  protected readonly FormControl = FormControl;


}
