import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { HistoriesRoutingModule } from './histories-routing.module';

import { HistoryListComponent } from './list/history-list.component';
import { HistoryDetailComponent } from './detail/history-detail.component';

@NgModule({
  imports: [SharedModule, HistoriesRoutingModule],
  declarations: [HistoryListComponent, HistoryDetailComponent]
})
export class HistoriesModule {}

export function HistoriesEntrypoint() {
  return HistoriesModule;
}
