import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "src/app/services/auth.service";
import {SessionService} from "src/app/services/session.service";

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
  localePath: string = "Pages/UserSettings/"
  myForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    phrase: new FormControl('', [Validators.required, Validators.pattern('')]),
    rememberMe: new FormControl('', [Validators.required]),
  });

  invalidEmailError: boolean = false;
  invalidPasswordError: boolean = false;
  invalidPhraseError: boolean = false;
  constructor(private authService: AuthService, private sessionService: SessionService) { }
  onSubmit(form: FormGroup) {
    this.validateForm(form);
    // debugger;
    this.authService.login(form.controls.email.value, form.controls.password.value, form.controls.phrase.value)
      .subscribe((response: any) => {
        // debugger;
        this.sessionService.setSession(response);
      });
    alert(1)
  }
  validateForm(form: FormGroup) {
    this.invalidEmailError = !form.controls.email.valid;
    this.invalidPasswordError = !form.controls.password.valid;
    this.invalidPhraseError = !form.controls.phrase.valid;
  }

  ngOnInit(): void {

  }

}
