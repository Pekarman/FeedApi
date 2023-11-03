import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "src/app/services/auth.service";
import {SessionService} from "src/app/services/session.service";

@Component({
  selector: 'app-ok-cancel',
  templateUrl: './ok-cancel.component.html',
  styleUrls: ['./ok-cancel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OkCancelComponent implements OnInit {
  myForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    phrase: new FormControl('', [Validators.required, Validators.pattern('')]),
    rememberMe: new FormControl('', [Validators.required]),
  });
  @Input() okText: string = '';
  @Input() cancelText: string = '';

  invalidEmailError: boolean = false;
  invalidPasswordError: boolean = false;
  invalidPhraseError: boolean = false;
  validateForm(form: FormGroup) {
    this.invalidEmailError = !form.controls.email.valid;
    this.invalidPasswordError = !form.controls.password.valid;
    this.invalidPhraseError = !form.controls.phrase.valid;
  }
  constructor(private authService: AuthService, private sessionService: SessionService) {
  }

  onSubmitHandler(form: FormGroup) {
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

  ngOnInit(): void {
  }

}
