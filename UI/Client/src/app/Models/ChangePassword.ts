export class ChangePassword {

  oldPassword: string;
  newPassword: string;
  username: string;
  isPassword: boolean;


  constructor(
    _oldPassword: string,
    _password: string,
    _userName: string,
    _isPassword : boolean
  ) {

    this.newPassword = _password;
    this.oldPassword = _oldPassword;
    this.username = _userName;
    this.isPassword = _isPassword;
  }
}
