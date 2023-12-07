import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class DashboardComponent implements OnInit {

  session!: any;
  searchValue: string = "";

  changeSearchValue(value : string){
    this.searchValue = value;
  }

  constructor(
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
    this.session = this.sessionService.getSession();
  }

}
