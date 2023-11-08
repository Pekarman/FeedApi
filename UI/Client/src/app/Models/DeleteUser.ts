export class DeleteUser {
  username:string
  password:string
  constructor(
    _userName:string,
    _password:string
  ) {
    this.username = _userName
    this.password = _password
  }
}
