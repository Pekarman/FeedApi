import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "src/app/services/auth.service";
import {SessionService} from "src/app/services/session.service";
import {UserService} from "src/app/services/user.service";
import {IChangePassword} from "src/app/Models/IChangePassword";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-password-change',
  templateUrl: './user-password-change.component.html',
  styleUrls: ['./user-password-change.component.scss']
})
export class UserPasswordChangeComponent implements OnInit {
  locale: any;
  localePath: string = "Pages/UserSettings/ChangePasswordSettings/"
  responseError: string = ''

  constructor(private userService: UserService, private sessionService: SessionService, private router: Router) {

  }

  invalidEmailError: boolean = false;
  invalidPasswordError: boolean = false;
  invalidPhraseError: boolean = false;


  myForm = new FormGroup({
    oldPassword: new FormControl('', [Validators.required, Validators.pattern('')]),
    newPassword: new FormControl('', [Validators.required, Validators.pattern('')]),
    replNewPassword: new FormControl('', [Validators.required, Validators.pattern('')]),
  });


  validateForm(form: FormGroup) {
    this.invalidEmailError = !form.controls.email.valid;
    this.invalidPasswordError = !form.controls.password.valid;
    this.invalidPhraseError = !form.controls.phrase.valid;
  }



    onSubmit(form: FormGroup) {
      var data: IChangePassword = {
        oldPassword: form.controls.oldPassword.value,
        newPassword: form.controls.newPassword.value,
        username: this.locale.user.username,
        isPassword: true
      }

      this.userService.changePassword(data).subscribe(response => {
        if (response.value) {
          this.router.navigate(['/userSettings'], {
            state: { response: response } // Передача данных через state
          });
        } else {
          this.responseError = response;
        }
      });
      setTimeout(()=>{
        this.responseError = '';
      },3000)
    }




  ngOnInit(): void {
    this.locale = this.sessionService.getSession();
  }

  protected readonly FormControl = FormControl;
}
