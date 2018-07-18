import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { OverviewComponent } from './overview/overview.component';

const routes: Routes = [
  { path: 'questions', component: OverviewComponent }

  // { path: 'stops/search', component: SearchComponent },
  // { path: 'stops/:id', component: DetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class QuestionsRoutingModule {}
