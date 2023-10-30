import { Injectable } from '@angular/core';
import { ApiConfig } from '../configs/apiconfig';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRegister } from '../Models/UserRegister';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly APIUrl=new ApiConfig().ApiUrl;

  constructor(private http:HttpClient) { }

  createUser(user: UserRegister):Observable<UserRegister>{
    return this.http.put<UserRegister>(this.APIUrl + 'Api/User',user);
  }
}
