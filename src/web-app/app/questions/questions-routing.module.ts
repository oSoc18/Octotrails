import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OverviewComponent } from './overview/overview.component';

const questionRoutes: Routes = [{ path: '', component: OverviewComponent }];

@NgModule({
  imports: [RouterModule.forChild(questionRoutes)],
  exports: [RouterModule]
})
export class QuestionsRoutingModule {}
