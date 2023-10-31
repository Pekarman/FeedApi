import { Component, Input, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  session: any;

  constructor(private sessionService: SessionService, private authService: AuthService) { }

  ngOnInit(): void {
    this.session = this.sessionService.getSession();
  }

  searchValue = "";

  @Output() textGhanged = new EventEmitter<string>();

  onTextChange(){
    this.textGhanged.emit(this.searchValue);
  }

  logout() {
    this.authService.logout(this.session.id);
  }
}
