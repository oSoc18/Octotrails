import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { environment } from '../../environments/environment';
import { QuestionsRoutingModule } from './questions-routing.module';

import { OverviewComponent } from './overview/overview.component';

@NgModule({
  imports: [SharedModule, QuestionsRoutingModule],
  declarations: [OverviewComponent]
})
export class QuestionsModule {}

export function QuestionsEntrypoint() {
  return QuestionsModule;
}
