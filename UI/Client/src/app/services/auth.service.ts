import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
import { ApiConfig } from '../configs/apiconfig';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly ApiUrl=new ApiConfig().ApiUrl;
  
  constructor(private http: HttpClient, private sessionService: SessionService) { }

  login(username: string, password: string, phrase: string): Observable<any> {
    return this.http.post(this.ApiUrl + 'api/Auth', { username, password, phrase });
  }
  
  logout(): void {
    this.http.post('api/logout', {}).subscribe(() => {
      this.sessionService.clearSession();
    });
  }
}