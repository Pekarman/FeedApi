import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../common/common-components.module';
import { LocalizationModule } from 'src/app/localization/localization.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CategoryGridComponent } from './components/category-grid/category-grid.component';
import { CategoryGridViewComponent } from './components/category-grid-view/category-grid-view.component';
import { BreadCrumbsComponent } from './components/bread-crumbs/bread-crumbs.component';



@NgModule({
  declarations: [
    DashboardComponent,
    CategoryGridComponent,
    CategoryGridViewComponent,
    BreadCrumbsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    LocalizationModule,
    CommonComponentsModule
  ],
  exports: [
    DashboardComponent,
    CategoryGridComponent,
    CategoryGridViewComponent
  ]
})
export class DashboardModule { }
