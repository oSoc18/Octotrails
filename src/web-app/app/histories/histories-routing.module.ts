import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HistoryComponent } from './history/history.component';

const histoRoutes: Routes = [
  { path: 'histories', component: HistoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(histoRoutes)],
  exports: [RouterModule]
})
export class HistoriesRoutingModule {}
