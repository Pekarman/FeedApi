import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-button',
  templateUrl: './users-button.component.html',
  styleUrls: ['./users-button.component.scss']
})
export class UsersButtonComponent implements OnInit {
  @Input() label: string = '';
  @Input() background: string = ''
  @Input() path: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
addDeals(){
    this.router.navigate(['addDeal'])
}
  onClick() {
    this.router.navigate([this.path]);
  }
}
