export class ChangeEmail{
  password: string;
  email: string;
  username: string;



  constructor(
    _email:string,
    _password: string,
    _userName:string

  ) {

    this.password = _password;
    this.email = _email;
    this.username = _userName

  }
}
