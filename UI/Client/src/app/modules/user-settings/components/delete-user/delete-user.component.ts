import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "src/app/services/auth.service";
import {SessionService} from "src/app/services/session.service";
import {UserService} from "src/app/services/user.service";
import {Router} from "@angular/router";
import {IDeleteUser} from "src/app/Models/IDeleteUser";

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {
  locale:any = '';
  localePath:string = 'Pages/UserSettings/DeleteUsers/'
  responseError: string = '';

  myForm = new FormGroup({
    password: new FormControl('', [Validators.required]),
    phrase: new FormControl('', [Validators.required])
  });

  invalidEmailError: boolean = false;
  invalidPasswordError: boolean = false;
  invalidPhraseError: boolean = false;

  constructor(private userService: UserService, private sessionService: SessionService, private router: Router) { }
  
  ngOnInit(): void {
    this.locale = this.sessionService.getSession();
  }
  onSubmit(form: FormGroup) {
    this.validateForm(form);
    if (!form.valid) return;
    const data: IDeleteUser = {
      username: this.locale?.user?.username,
      password: form.controls.password.value
    }

    this.userService.deleteUser(data).subscribe(response => {
      
      if (response.value) {
        this.router.navigate(['/userSettings'], {
          state: {response: response}
        });
      } else {
        this.responseError = response;
      }
      console.log(response)
    })
  }

  validateForm(form: FormGroup) {
    this.invalidEmailError = !form.controls.email.valid;
    this.invalidPasswordError = !form.controls.password.valid;
    this.invalidPhraseError = !form.controls.phrase.valid;
  }
}
