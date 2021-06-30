import { Component, Input, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  searchValue = "";

  @Output() textGhanged = new EventEmitter<string>();

  onTextChange(){
    this.textGhanged.emit(this.searchValue);
  }
}
