import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-burger-menu',
  templateUrl: './burger-menu.component.html',
  styleUrls: ['./burger-menu.component.scss']
})
export class BurgerMenuComponent implements OnInit {
  @Output() isOpenChange = new EventEmitter<boolean>();
  isOpen: boolean = false;
  arrayForCategories: Array<string> = ['Товары', 'Продукты', 'Услуги']
  constructor() {

  }


  toggleMenu() {
    this.isOpen = !this.isOpen;
    this.isOpenChange.emit(this.isOpen);
  }
  ngOnInit(): void {
  }

}
