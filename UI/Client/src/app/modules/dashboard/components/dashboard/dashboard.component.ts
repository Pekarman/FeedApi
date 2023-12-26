import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {SessionService} from 'src/app/services/session.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class DashboardComponent implements OnInit {
  session!: any;
  searchValue: string = "";
  isChildOpen: boolean = false;

  changeSearchValue(value: string) {
    this.searchValue = value;
  }

  onChildOpenChange(value: boolean) {
    this.isChildOpen = value;
  }

  constructor(
    private sessionService: SessionService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.session = this.sessionService.getSession();

  }

  addDeals() {
    this.router.navigate(['addDeal'])
  }
}
