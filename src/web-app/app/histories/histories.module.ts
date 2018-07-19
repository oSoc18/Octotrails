import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDesignModule } from '../shared/mat-design/mat-design.module';

import { HistoriesRoutingModule } from './histories-routing.module';
import { HistoryComponent } from './history/history.component';
import { HistoryDetailComponent } from './history-detail/history-detail.component';
import { SharedModule } from '../shared/shared.module';
// import { NumberComponent } from '../questions/question-types/number/number.component';
// import { BooleanComponent } from '../questions/question-types/boolean/boolean.component';
// import { MultipleComponent } from '../questions/question-types/multiple/multiple.component';
// import { StringComponent } from '../questions/question-types/string/string.component';

@NgModule({
  imports: [CommonModule, MatDesignModule, SharedModule, HistoriesRoutingModule],
  declarations: [HistoryComponent,
    HistoryDetailComponent,
    // NumberComponent,
    // BooleanComponent,
    // MultipleComponent,
    // StringComponent
  ],
  exports: [HistoriesRoutingModule]
})
export class HistoriesModule {}
