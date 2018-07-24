import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoryResolver } from './category.resolver';
import { CategoryQuestionsResolver } from './category-questions.resolver';
import { CategoriesOverviewComponent } from './overview/categories-overview.component';
import { QuestionsOverviewComponent } from './questions/questions-overview.component';

const categoriesRoutes: Routes = [
  {
    path: '',
    resolve: { categories: CategoryResolver },
    component: CategoriesOverviewComponent
  },
  {
    path: '/:category_num/questions',
    resolve: { questions: CategoryQuestionsResolver },
    component: QuestionsOverviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(categoriesRoutes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule {}
