import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArticleComponent } from './components/article/article.component';
import { ArticleList } from './components/article-list/article-list.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path: 'article', component:ArticleComponent},
  {path: 'show-article', component:ArticleList},
  {path: 'login', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
