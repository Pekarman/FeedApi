import { Injectable } from '@angular/core';
import { LocalizationService } from '../localization/localization.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private sessionKey = 'session';

  constructor(private localizationService: LocalizationService) { }

  setSession(session: any): void {
    this.localizationService.locale = session.locale;
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