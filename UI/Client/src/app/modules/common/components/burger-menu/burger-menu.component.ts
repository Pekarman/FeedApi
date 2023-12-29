import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

interface ClickGoodsEvent {
  isGoods: boolean;
  category: string;
}

@Component({
  selector: 'app-burger-menu',
  templateUrl: './burger-menu.component.html',
  styleUrls: ['./burger-menu.component.scss']
})
export class BurgerMenuComponent implements OnInit {
  @Output() isOpenChange = new EventEmitter<boolean>();
  @Output() isClickGoods = new EventEmitter<ClickGoodsEvent>();
  isGridVisible: boolean = false;
  isOpen: boolean = false;
  arrayForCategories: Array<string> = ['Goods', 'Products', 'Services']

  constructor() {

  }


  burgerMenuClick(value: string) {
      this.arrayForCategories = ['Goods', 'Products', 'Services'];
      this.isGridVisible = false;
      this.isGridVisible = true;
      this.isClickGoods.emit({isGoods: this.isGridVisible, category: value});
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
    this.isOpenChange.emit(this.isOpen);
  }

  ngOnInit(): void {
  }

}
