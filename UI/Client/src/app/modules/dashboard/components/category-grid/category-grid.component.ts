import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CategoryEnum} from 'src/app/enums/CategoryEnum';
import {DealListFilter} from "src/app/modules/common/components/deal-list/DealListFilter";


@Component({
  selector: 'app-category-grid',
  templateUrl: './category-grid.component.html',
  styleUrls: ['./category-grid.component.scss']
})
export class CategoryGridComponent implements OnInit {
  @Input() categories: any
  @Output() filterApply = new EventEmitter<DealListFilter>()
  @Output() breadCrumbsString = new EventEmitter<string>();
  @Input() crumbsString: any


  constructor() {

  }

  getCategories() {
    return Object.keys(this.categories)
  }

  ngOnInit(): void {

  }

  categoryClick(category: string) {
    this.breadCrumbsString.emit(category)
    this.categories = this.categories[category];
        if (this.categories === '') {
      const categoryId = Object.values(CategoryEnum).findIndex((cat, index) => cat !== Number(cat) && cat === category ? index : null)
      this.filterApply.emit({userId: -1, categoryId: categoryId, watchUserId: -1, boughtUserId: -1, sellUserId: -1})
    }
  }

}
