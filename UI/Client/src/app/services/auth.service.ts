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

  login(email: string, password: string, phrase: string): Observable<any> {
    return this.http.post(this.ApiUrl + 'api/Auth', { email, password, phrase });
  }
  
  logout(sessionId: number): void {
    this.http.delete('api/Auth', {params: {sessionId}}).subscribe(() => {
      this.sessionService.clearSession();
    });
  }
}