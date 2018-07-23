import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { environment } from '../../environments/environment';
import { QuestionsRoutingModule } from './questions-routing.module';

import { QuestionOverviewComponent } from './overview/question-overview.component';

@NgModule({
  imports: [SharedModule, QuestionsRoutingModule],
  declarations: [QuestionOverviewComponent]
})
export class QuestionsModule {}

export function QuestionsEntrypoint() {
  return QuestionsModule;
}
