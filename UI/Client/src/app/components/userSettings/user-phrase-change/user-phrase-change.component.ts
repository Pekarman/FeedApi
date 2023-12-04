import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "src/app/services/auth.service";
import {SessionService} from "src/app/services/session.service";
import {IChangePassword} from "src/app/Models/IChangePassword";
import {IChangePhrase} from "src/app/Models/IChangePhrase";
import {UserService} from "src/app/services/user.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-phrase-change',
  templateUrl: './user-phrase-change.component.html',
  styleUrls: ['./user-phrase-change.component.scss']
})
export class UserPhraseChangeComponent implements OnInit {
  localePath:string = 'Pages/UserSettings/ChangeSecretPhrase/'
  responseError: string = ''

  myForm = new FormGroup({
    oldPhrase: new FormControl('', [Validators.required]),
    newPhrase: new FormControl('', [Validators.required]),
    replNewPhrase: new FormControl('', [Validators.required]),

  });

  phraseMatchesError: boolean = false;

  constructor( private userService: UserService, private router: Router) { }

  ngOnInit(): void { }

  onSubmit(form: FormGroup) {
    this.validateForm(form);
    if (!form.valid) return;
    const data: IChangePhrase = {
      oldPhrase: this.myForm.controls.oldPhrase.value,
      newPhrase: this.myForm.controls.newPhrase.value,
      replNewPhrase: this.myForm.controls.replNewPhrase.value
    }
    this.userService.changePhrase(data).subscribe(response => {
      if (response.value) {
        this.router.navigate(['/userSettings'], {
          state: { response: response }
        });
      } else {
        this.responseError = response;
      }
    })
    setTimeout(()=>{
      this.responseError = '';
    },3000)
  }

  validateForm(form: FormGroup) {
    this.phraseMatchesError = form.controls.newPhrase.value != form.controls.replNewPhrase.value;
  }
}
