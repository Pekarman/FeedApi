import { Component, OnInit } from '@angular/core';
import { CategoryEnum } from 'src/app/enums/CategoryEnum';


@Component({
  selector: 'app-category-grid',
  templateUrl: './category-grid.component.html',
  styleUrls: ['./category-grid.component.scss']
})
export class CategoryGridComponent implements OnInit {
  
  arrayOfCategoryEnum = Object.values(CategoryEnum).filter((category) => category !== Number(category))

  constructor() { }

  ngOnInit(): void {
  }

}
