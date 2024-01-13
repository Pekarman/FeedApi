import { Injectable } from '@angular/core';
import { LocalizationService } from '../localization/localization.service';
import { ApiConfig } from '../configs/apiconfig';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private sessionKey = 'session';
  readonly APIUrl = new ApiConfig().ApiUrl;

  constructor(private localizationService: LocalizationService, private http: HttpClient) { }

  setSession(session: any): void {
    if (session.locale) this.localizationService.locale = session.locale;
    localStorage.setItem(this.sessionKey, JSON.stringify(session));
  }

  getSession(): any {
    const sessionString = localStorage.getItem(this.sessionKey) as string;
    return JSON.parse(sessionString);
  }

  getSessionAsync(): any {
    const sessionString = localStorage.getItem(this.sessionKey) as string
    var localSession = JSON.parse(sessionString);
    return this.http.get(this.APIUrl + `Api/Auth/${localSession.id}`);
  }

  clearSession(): void {
    localStorage.removeItem(this.sessionKey);
  }
}