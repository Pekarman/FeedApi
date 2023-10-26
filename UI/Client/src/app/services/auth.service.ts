import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  login(username: string, password: string): void {
    this.http.post('/api/login', { username, password }).subscribe((response) => {
      this.sessionService.setSession(response);
    });
  }

  logout(): void {
    this.http.post('/api/logout', {}).subscribe(() => {
      this.sessionService.clearSession();
    });
  }
}