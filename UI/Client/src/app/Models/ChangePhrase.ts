export class ChangePhrase {
  oldPhrase: string;
  newPhrase: string;
  replNewPhrase: string;

  constructor(
    _oldPhrase: string,
    _newPhrase: string,
    _replNewPhrase:string
  ) {
    this.oldPhrase = _oldPhrase;
    this.newPhrase = _newPhrase;
    this.replNewPhrase = _replNewPhrase;
  }
}
