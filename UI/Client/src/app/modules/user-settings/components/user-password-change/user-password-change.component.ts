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
  localePath: string = "Pages/UserSettings/ChangePasswordSettings/"
  responseError: string = ''

  invalidPasswordError: boolean = false;
  passwordMatchesError: boolean = false;
  newPasswordMatchesOldError: boolean = false;


  myForm = new FormGroup({
    oldPassword: new FormControl('', [Validators.required, Validators.pattern('')]),
    newPassword: new FormControl('', [Validators.required, Validators.pattern('^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$')]),
    replNewPassword: new FormControl('', [Validators.required, Validators.pattern('')]),
  });


  constructor(
    private userService: UserService,
    private sessionService: SessionService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }
  
  onSubmit(form: FormGroup) {

    this.validateForm(form);
    if (form.status == "INVALID") return;

    var data: IChangePassword = {
      oldPassword: form.controls.oldPassword.value,
      newPassword: form.controls.newPassword.value,
      username: this.sessionService.getSession().user.username,
      isPassword: true
    }

    this.userService.changePassword(data).subscribe(response => {
      if (response.value) {
        this.router.navigate(['/userSettings'], {
          state: { response: response }
        });
      } else {
        this.responseError = response;
      }
    });
    setTimeout(()=>{
      this.responseError = '';
    },3000)    
  }
  
  validateForm(form: FormGroup) {
    this.invalidPasswordError = !form.controls.newPassword.valid;
    this.passwordMatchesError = form.controls.newPassword.value !== form.controls.replNewPassword.value;
    this.newPasswordMatchesOldError = form.controls.newPassword.value == form.controls.oldPassword.value;
  }

}
