import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { CarouselModule } from '../my-octotrails-ng6-carousel';

import { InMemoryDataService } from '../data.mock';

import { environment } from '../../environments/environment';
import { QuestionsRoutingModule } from './questions-routing.module';
import { MatDesignModule } from '../shared/mat-design/mat-design.module';

import { OverviewComponent } from './overview/overview.component';
import { NumberComponent } from './question-types/number/number.component';
import { BooleanComponent } from './question-types/boolean/boolean.component';
import { MultipleComponent } from './question-types/multiple/multiple.component';
import { StringComponent } from './question-types/string/string.component';

@NgModule({
  imports: [CommonModule, MatDesignModule, QuestionsRoutingModule],
  declarations: [
    OverviewComponent,
    NumberComponent,
    BooleanComponent,
    MultipleComponent,
    StringComponent
  ],
  exports: [QuestionsRoutingModule]
})
export class QuestionsModule {}
