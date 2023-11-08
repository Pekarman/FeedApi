import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "src/app/services/auth.service";
import {SessionService} from "src/app/services/session.service";
import {UserService} from "src/app/services/user.service";
import {Router} from "@angular/router";
import {DeleteUser} from "src/app/Models/DeleteUser";

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {
localePath:string = 'Pages/UserSettings/DeleteUsers/'
  locale:any = '';
  myForm = new FormGroup({
    password: new FormControl('', [Validators.required]),
    phrase: new FormControl('', [Validators.required])
  });

  invalidEmailError: boolean = false;
  invalidPasswordError: boolean = false;
  invalidPhraseError: boolean = false;
  constructor(private userService: UserService, private sessionService: SessionService, private router: Router) { }
  onSubmit(form: FormGroup) {
    const data = new DeleteUser(this.locale?.user?.username, this.myForm.controls.password.value)
   this.userService.deleteUser(data).subscribe(response => {
     console.log(response)
   })
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
