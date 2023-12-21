import { Component, OnInit } from '@angular/core';
import {CategoryEnum} from "src/app/enums/CategoryEnum";

@Component({
  selector: 'app-category-grid-view',
  templateUrl: './category-grid-view.component.html',
  styleUrls: ['./category-grid-view.component.scss']
})
export class CategoryGridViewComponent implements OnInit {
   arrayOfCategoryEnum = Object.values(CategoryEnum).filter((category) => category !== Number(category))
  constructor() {

  }

  ngOnInit(): void {
  }

}
