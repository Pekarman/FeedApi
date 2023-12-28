import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CategoryEnum} from 'src/app/enums/CategoryEnum';
import {IDealListFilter} from "src/app/modules/common/components/deal-list/IDealListFilter";


@Component({
  selector: 'app-category-grid',
  templateUrl: './category-grid.component.html',
  styleUrls: ['./category-grid.component.scss']
})
export class CategoryGridComponent implements OnInit {
  @Input() categories: any
  @Output() filterApply = new EventEmitter<IDealListFilter>()

  constructor() {
  }

  getCategories() {
    return Object.keys(this.categories)
  }

  categoryClick(category: string) {
    this.categories = this.categories[category]
    if (this.categories === '') {
      const categoryId = Object.values(CategoryEnum).findIndex((cat, index) => cat !== Number(cat) && cat === category ? index : null)
      this.filterApply.emit({userId: -1, categoryId: categoryId, watchUserId: -1})
    }

  }

  ngOnInit(): void {


  }

  protected readonly String = String;
}
