import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "src/app/services/auth.service";
import {SessionService} from "src/app/services/session.service";
import {ChangePassword} from "src/app/Models/ChangePassword";
import {ChangePhrase} from "src/app/Models/ChangePhrase";
import {UserService} from "src/app/services/user.service";

@Component({
  selector: 'app-user-phrase-change',
  templateUrl: './user-phrase-change.component.html',
  styleUrls: ['./user-phrase-change.component.scss']
})
export class UserPhraseChangeComponent implements OnInit {
localePath:string = 'Pages/UserSettings/ChangeSecretPhrase/'
  myForm = new FormGroup({
    oldPhrase: new FormControl('', [Validators.required, Validators.pattern('')]),
    newPhrase: new FormControl('', [Validators.required]),
    replNewPhrase: new FormControl('', [Validators.required]),

  });

  invalidEmailError: boolean = false;
  invalidPasswordError: boolean = false;
  invalidPhraseError: boolean = false;
  constructor( private userService: UserService) { }
  onSubmit(form: FormGroup) {
    const data = new ChangePhrase(this.myForm.controls.oldPhrase.value, this.myForm.controls.newPhrase.value, this.myForm.controls.replNewPhrase.value,);
    this.userService.changePhrase(data).subscribe(response => {
      debugger
      console.log(response)
    })

  }


  validateForm(form: FormGroup) {
    this.invalidEmailError = !form.controls.email.valid;
    this.invalidPasswordError = !form.controls.password.valid;
    this.invalidPhraseError = !form.controls.phrase.valid;
  }

  ngOnInit(): void {
  }

}
