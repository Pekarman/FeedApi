import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserRegister } from '../Models/IUserRegister';
import {IChangePassword} from "src/app/Models/IChangePassword";
import {IChangeEmail} from "src/app/Models/IChangeEmail";
import {IDeleteUser} from "src/app/Models/IDeleteUser";
import { IUser } from '../Models/IUser';
import ApiConfig from '../configs/apiconfig.json';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly APIUrl = ApiConfig.ApiUrl;

  constructor(private http:HttpClient) { }
 
  getUserById(id: number):Observable<IUser>{
    return this.http.get<IUser>(this.APIUrl + `Api/User/${id}`);
  }
   
  createUser(user: IUserRegister):Observable<IUserRegister>{
    return this.http.put<IUserRegister>(this.APIUrl + 'Api/User',user);
  }

  changePassword(user: IChangePassword):Observable<any>{
    return this.http.patch<any>(this.APIUrl + 'Api/User',user);
  }

  changePhrase(data:IChangePassword):Observable<any>{
    return this.http.patch<any>(this.APIUrl + 'Api/User',data);
  }

  changeEmail(data:IChangeEmail):Observable<any>{
    return this.http.patch<any>(this.APIUrl + 'Api/User/changeEmail',data);
  }

  deleteUser(data:IDeleteUser):Observable<any>{
    return this.http.post<any>(this.APIUrl + 'Api/User/deleteUser', data)
  }
}
