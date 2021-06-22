import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArticleComponent } from './components/article/article.component';
import { ShowArticleComponent } from './components/article-list/article-list.component';

const routes: Routes = [
  {path: 'article', component:ArticleComponent},
  {path: 'show-article', component:ShowArticleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
