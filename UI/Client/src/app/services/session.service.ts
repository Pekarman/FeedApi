import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private sessionKey = 'session';

  constructor() { }

  setSession(session: any): void {
    localStorage.setItem(this.sessionKey, JSON.stringify(session));
  }

  getSession(): any {
    const sessionString = localStorage.getItem(this.sessionKey) as string;
    return JSON.parse(sessionString);
  }

  clearSession(): void {
    localStorage.removeItem(this.sessionKey);
  }
}