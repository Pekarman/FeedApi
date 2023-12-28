import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {SessionService} from 'src/app/services/session.service';
import CategoryTree from 'src/app/modules/dashboard/treeOfGoodsAndServices/treeOfGoodsAndServices.json'
import {IDealListFilter} from "src/app/modules/common/components/deal-list/IDealListFilter";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class DashboardComponent implements OnInit {
  session!: any;
  searchValue: string = "";
  isChildOpen: boolean = false;
  isGridVisible: boolean = false;
  categoryTree: any = CategoryTree;
  filter!: IDealListFilter
  isCategoryVisible: boolean = false;

  getFilter(filter: IDealListFilter) {
    this.isGridVisible = !this.isGridVisible
    this.filter = filter
  }

  chooseCategory(category: string) {
    this.categoryTree = CategoryTree[category];
  }

  goodsClick(isGridVisible: boolean, category: string) {
    this.isGridVisible = isGridVisible;
    this.categoryTree = this.categoryTree[category];
  }

  changeSearchValue(value: string) {
    this.searchValue = value;
  }
  onCategoryOpenChange(isCategoryOpen: boolean){
    this.isCategoryVisible = isCategoryOpen;
  }
  onBurgerMenuOpenChange(isOpenBurger: boolean) {
    this.isChildOpen = isOpenBurger;

  }

  constructor(
    private sessionService: SessionService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.session = this.sessionService.getSession();
  }

  addDeals() {
    this.router.navigate(['addDeal'])
  }
}
