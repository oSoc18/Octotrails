import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { environment } from '../../environments/environment';
import { QuestionsRoutingModule } from './questions-routing.module';

import { OverviewComponent } from './overview/overview.component';
import { NumberComponent } from './question-types/number/number.component';
import { BooleanComponent } from './question-types/boolean/boolean.component';
import { MultipleComponent } from './question-types/multiple/multiple.component';
import { StringComponent } from './question-types/string/string.component';
import { Routes, RouterModule } from '@angular/router';

const questionRoutes: Routes = [
  { path: '', component: OverviewComponent }

  // { path: 'stops/search', component: SearchComponent },
  // { path: 'stops/:id', component: DetailComponent },
];
@NgModule({
  imports: [
    SharedModule,
    /*QuestionsRoutingModule,*/ RouterModule.forChild(questionRoutes)
  ],
  declarations: [
    OverviewComponent,
    NumberComponent,
    BooleanComponent,
    MultipleComponent,
    StringComponent
  ]
})
export class QuestionsModule {}

export function QuestionsEntrypoint() {
  return QuestionsModule;
}
