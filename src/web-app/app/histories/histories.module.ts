import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDesignModule } from '../shared/mat-design/mat-design.module';

import { HistoriesRoutingModule } from './histories-routing.module';
import { HistoryComponent } from './history/history.component';

@NgModule({
  imports: [CommonModule, MatDesignModule, HistoriesRoutingModule],
  declarations: [HistoryComponent],
  exports: [HistoriesRoutingModule]
})
export class HistoriesModule {}
