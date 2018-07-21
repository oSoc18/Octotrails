import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HistoryComponent } from './history/history.component';
import { HistoryDetailComponent } from './history-detail/history-detail.component';

const histoRoutes: Routes = [
  { path: 'histories', component: HistoryComponent },
  { path: 'histories/:history_id', component: HistoryDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(histoRoutes)],
  exports: [RouterModule]
})
export class HistoriesRoutingModule {}
