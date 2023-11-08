import { Injectable } from '@angular/core';
import { ApiConfig } from '../configs/apiconfig';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRegister } from '../Models/UserRegister';
import {ChangePassword} from "src/app/Models/ChangePassword";
import {ChangeEmail} from "src/app/Models/ChangeEmail";
import {DeleteUser} from "src/app/Models/DeleteUser";
import {ChangePhrase} from "src/app/Models/ChangePhrase";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly APIUrl=new ApiConfig().ApiUrl;
  constructor(private http:HttpClient) { }
  createUser(user: UserRegister):Observable<UserRegister>{
    return this.http.put<UserRegister>(this.APIUrl + 'Api/User',user);
  }
  changePassword(user: ChangePassword):Observable<any>{
    return this.http.patch<any>(this.APIUrl + 'Api/User',user);
  }
  changeEmail(data:ChangeEmail):Observable<any>{
    return this.http.patch<any>(this.APIUrl + 'Api/User',data);
  }
  deleteUser(data:DeleteUser):Observable<any>{
    return this.http.post<any>(this.APIUrl + 'Api/user', data)
  }
  changePhrase(data:ChangePhrase):Observable<any>{
    return this.http.patch<any>(this.APIUrl + 'Api/User',data);
  }

}
