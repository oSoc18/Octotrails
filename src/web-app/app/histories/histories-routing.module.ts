import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HistoryListComponent } from './list/history-list.component';
import { HistoryDetailComponent } from './detail/history-detail.component';
import { HistoriesResolver } from './histories.resolver';
import { HistoryResolver } from './history.resolver';

const histoRoutes: Routes = [
  {
    path: '',
    resolve: { histories: HistoriesResolver },
    component: HistoryListComponent
  },
  {
    path: ':history_id',
    resolve: { history: HistoryResolver },
    component: HistoryDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(histoRoutes)],
  exports: [RouterModule]
})
export class HistoriesRoutingModule {}
