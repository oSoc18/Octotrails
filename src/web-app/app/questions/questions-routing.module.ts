import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuestionOverviewComponent } from './overview/question-overview.component';

const questionRoutes: Routes = [
  { path: '', component: QuestionOverviewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(questionRoutes)],
  exports: [RouterModule]
})
export class QuestionsRoutingModule {}
