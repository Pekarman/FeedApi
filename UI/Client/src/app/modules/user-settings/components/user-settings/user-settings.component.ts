import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})

export class UserSettingsComponent implements OnInit {
  responseData: any;
  localePath: string = "Pages/UserSettings/"
  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.responseData = navigation?.extras.state.response;
    }
    setTimeout(()=>{
      this.responseData = '';
    },3000)
  }

  ngOnInit(): void {

  }

}
