import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OverviewComponent } from './overview/overview.component';

const questionRoutes: Routes = [
  { path: '', component: OverviewComponent }

  // { path: 'stops/search', component: SearchComponent },
  // { path: 'stops/:id', component: DetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(questionRoutes)],
  exports: [RouterModule]
})
export class QuestionsRoutingModule {}
