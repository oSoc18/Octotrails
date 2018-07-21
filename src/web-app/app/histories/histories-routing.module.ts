import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HistoryListComponent } from './list/history-list.component';
import { HistoryDetailComponent } from './detail/history-detail.component';

const histoRoutes: Routes = [
  { path: '', component: HistoryListComponent },
  { path: ':history_id', component: HistoryDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(histoRoutes)],
  exports: [RouterModule]
})
export class HistoriesRoutingModule {}
