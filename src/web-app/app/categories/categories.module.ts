import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { environment } from '../../environments/environment';
import { CategoriesRoutingModule } from './categories-routing.module';
import {MatExpansionModule} from '@angular/material/expansion';


import { CategoriesOverviewComponent } from './overview/categories-overview.component';
import { QuestionsOverviewComponent } from './questions/questions-overview.component';

@NgModule({
  imports: [SharedModule, CategoriesRoutingModule, MatExpansionModule],
  declarations: [QuestionsOverviewComponent, CategoriesOverviewComponent]
})
export class CategoriesModule {}

export function CategoriesEntrypoint() {
  return CategoriesModule;
}
