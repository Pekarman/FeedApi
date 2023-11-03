import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "src/app/services/auth.service";
import {SessionService} from "src/app/services/session.service";

@Component({
  selector: 'app-user-password-change',
  templateUrl: './user-password-change.component.html',
  styleUrls: ['./user-password-change.component.scss']
})
export class UserPasswordChangeComponent implements OnInit {
  localePath: string = "Pages/UserSettings/ChangePasswordSettings/"
  constructor(private authService: AuthService, private sessionService: SessionService) { }
  invalidEmailError: boolean = false;
  invalidPasswordError: boolean = false;
  invalidPhraseError: boolean = false;

  myForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    phrase: new FormControl('', [Validators.required, Validators.pattern('')]),
    rememberMe: new FormControl('', [Validators.required]),
  });

  validateForm(form: FormGroup) {
    this.invalidEmailError = !form.controls.email.valid;
    this.invalidPasswordError = !form.controls.password.valid;
    this.invalidPhraseError = !form.controls.phrase.valid;
  }
  onSubmit(form: FormGroup) {
    this.validateForm(form);
    this.authService.login(form.controls.email.value, form.controls.password.value, form.controls.phrase.value)
      .subscribe((response: any) => {
        debugger
        this.sessionService.setSession(response);
      });
    // alert(1)
  }
  ngOnInit(): void {
  }

}
