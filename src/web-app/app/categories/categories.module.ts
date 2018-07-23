import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { environment } from '../../environments/environment';
import { CategoriesRoutingModule } from './categories-routing.module';

import { CategoriesOverviewComponent } from './overview/categories-overview.component';
import { QuestionsOverviewComponent } from './questions/questions-overview.component';

@NgModule({
  imports: [SharedModule, CategoriesRoutingModule],
  declarations: [QuestionsOverviewComponent, CategoriesOverviewComponent]
})
export class CategoriesModule {}

export function CategoriesEntrypoint() {
  return CategoriesModule;
}
