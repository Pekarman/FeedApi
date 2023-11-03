import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-users-button',
  templateUrl: './users-button.component.html',
  styleUrls: ['./users-button.component.scss']
})
export class UsersButtonComponent implements OnInit {
  @Input()label:string = '';
  @Input()background: string = ''
  constructor() { }

  ngOnInit(): void {
  }

}
