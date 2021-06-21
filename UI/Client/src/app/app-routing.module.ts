import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArticleComponent } from './article/article.component';
import { ShowArticleComponent } from './article/show-article/show-article.component';

const routes: Routes = [
  {path: 'article', component:ArticleComponent},
  {path: 'show-article', component:ShowArticleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
