import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {SessionService} from 'src/app/services/session.service';
import CategoryTree from 'src/app/modules/dashboard/treeOfGoodsAndServices/treeOfGoodsAndServices.json'
import {DealListFilter} from "src/app/modules/common/components/deal-list/DealListFilter";

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
  filter!: DealListFilter
  isCategoryVisible: boolean = false;
  isLoggedIn: boolean = false;
  breadCrumbs: Array<string> = [];
  getCrumbText: string = ''

  getBreadCrumbs(crumbs: string) {
    this.breadCrumbs.push(crumbs)
  }


  getFilter(filter: DealListFilter) {
    this.isGridVisible = !this.isGridVisible
    this.filter = filter
  }


  onIsLoggedInChange(isLoggedIn: boolean) {
    this.isLoggedIn = isLoggedIn
  }

  chooseCategory(category: string) {
    this.categoryTree = CategoryTree[category];
    this.isGridVisible = false;
    setTimeout(() => this.isGridVisible = true, 1);
  }

  chooseCategoryFromBreadCrumb(path: string[]) {
    let partialTree = CategoryTree;
    path.forEach((el) => partialTree = partialTree[el]);
    this.categoryTree = partialTree;
    this.isGridVisible = false;
    setTimeout(() => this.isGridVisible = true, 1);
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
