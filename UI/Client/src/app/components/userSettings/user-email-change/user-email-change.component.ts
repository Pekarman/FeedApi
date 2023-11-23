import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SessionService} from "src/app/services/session.service";
import {UserService} from "src/app/services/user.service";
import {Router} from "@angular/router";
import {IChangeEmail} from "src/app/Models/IChangeEmail";

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
    const data: IChangeEmail = {
      password: form.controls.password.value,
      email: form.controls.email.value,
      username: this.locale?.user?.username
    }
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
}
