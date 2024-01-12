import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import value from "*.json";


@Component({
  selector: 'app-bread-crumbs',
  templateUrl: './bread-crumbs.component.html',
  styleUrls: ['./bread-crumbs.component.scss']
})
export class BreadCrumbsComponent implements OnInit {
  @Input() crumbs : Array<string> = [];
  @Output() crumbsString  =  new EventEmitter<string[]>();

  setCrumbs(crumb: string){
    let index = this.crumbs.indexOf(crumb);
    this.crumbs.splice(index + 1, this.crumbs.length - index );
    this.crumbsString.emit(this.crumbs);
  }
  constructor() {

  }

  ngOnInit(): void {
  }

}
