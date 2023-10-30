import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserRegister } from 'src/app/Models/UserRegister';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class RegisterComponent implements OnInit {

  myForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern('^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$')]),
    password2: new FormControl('', [Validators.required, Validators.pattern('^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$')]),
    phrase: new FormControl('', [Validators.required, Validators.pattern('')]),
    phrase2: new FormControl('', [Validators.required, Validators.pattern('')]),
  });

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit(form: FormGroup) {
    this.validateForm(form);

    var user = new UserRegister(
      this.myForm.controls.firstName.value,
      this.myForm.controls.lastName.value,
      this.myForm.controls.username.value,
      this.myForm.controls.email.value,
      this.myForm.controls.password.value,
      this.myForm.controls.phrase.value
    );
    debugger;

    this.userService.createUser(user)
      .subscribe((response: any) => {
        debugger;
      });

    // if (form.valid) 
    // console.log(form);
  }

  validateForm(form: FormGroup) {
    // this.invalidEmailError = !form.controls.email.valid;
    // this.invalidPasswordError = !form.controls.password.valid;
    // this.invalidPhraseError = !form.controls.phrase.valid;
  }

}
