import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  session: any;

  isLoggedIn: boolean = false;

  constructor(
    private sessionService: SessionService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.session = this.sessionService.getSession();
    this.isLoggedIn = this.session !== null;
  }

  searchValue = "";

  @Output() textGhanged = new EventEmitter<string>();

  onTextChange(){
    this.textGhanged.emit(this.searchValue);
  }

  logout() {
    this.authService.logout(this.session.id).subscribe((response: any) => {
      console.log(response);
      this.sessionService.clearSession();
      
      this.isLoggedIn = false;
    });
  }
}
