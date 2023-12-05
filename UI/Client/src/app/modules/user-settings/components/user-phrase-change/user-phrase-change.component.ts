import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SessionService} from "src/app/services/session.service";
import {IChangePassword} from "src/app/Models/IChangePassword";
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
  newPhraseMatchesOldError: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private sessionService: SessionService,
  ) { }

  ngOnInit(): void { }

  onSubmit(form: FormGroup) {
    this.validateForm(form);
    if (this.phraseMatchesError || this.newPhraseMatchesOldError) return;
    const data: IChangePassword = {
      oldPassword: this.myForm.controls.oldPhrase.value,
      newPassword: this.myForm.controls.newPhrase.value,
      username: this.sessionService.getSession().user.username,
      isPassword: false,
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
    this.newPhraseMatchesOldError = form.controls.newPhrase.value == form.controls.oldPhrase.value;
  }
}
