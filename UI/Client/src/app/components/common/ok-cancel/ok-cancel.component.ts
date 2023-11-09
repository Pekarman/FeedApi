import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "src/app/services/auth.service";
import {SessionService} from "src/app/services/session.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ok-cancel',
  templateUrl: './ok-cancel.component.html',
  styleUrls: ['./ok-cancel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OkCancelComponent implements OnInit {

  @Input() okText: string = '';
  @Input() cancelText: string = '';

  constructor(private router: Router) {}

  goUserSetting(){
    this.router.navigate(['/userSettings'])
  }
  ngOnInit(): void {
  }

}
