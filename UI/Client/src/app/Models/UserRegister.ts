export class UserRegister{
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    phrase: string;


    constructor(
        _firstName: string,
        _lastname: string,
        _username: string,
        _email: string,
        _password: string,
        _phrase: string,
        )        {
        this.firstName = _firstName;
        this.lastName = _lastname;
        this.username = _username;
        this.email = _email;
        this.password = _password;
        this.phrase = _phrase;
    }
}