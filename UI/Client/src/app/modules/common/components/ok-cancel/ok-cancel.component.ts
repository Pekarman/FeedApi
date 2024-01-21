import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ok-cancel',
  templateUrl: './ok-cancel.component.html',
  styleUrls: ['./ok-cancel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OkCancelComponent implements OnInit {

  @Input() okText: string = '';
  @Input() cancelText: string = '';

  constructor(private location: Location) {}

  goUserSetting(){
    this.location.back();
  }

  ngOnInit(): void {}
}
