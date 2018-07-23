import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  PageNotFoundComponent,
  QuestionTypeBooleanComponent,
  QuestionTypeMultipleComponent,
  QuestionTypeNumberComponent,
  QuestionTypeStringComponent,
  NavbarComponent
} from './components/';
import { RangeValidatorDirective } from './directives/range.directive';
import { MatDesignModule } from './mat-design/mat-design.module';

@NgModule({
  imports: [CommonModule, MatDesignModule],
  declarations: [
    PageNotFoundComponent,
    RangeValidatorDirective,
    QuestionTypeNumberComponent,
    QuestionTypeBooleanComponent,
    QuestionTypeMultipleComponent,
    QuestionTypeStringComponent,
    NavbarComponent
  ],
  exports: [
    CommonModule,
    MatDesignModule,
    PageNotFoundComponent,
    RangeValidatorDirective,
    MatDesignModule,
    QuestionTypeNumberComponent,
    QuestionTypeBooleanComponent,
    QuestionTypeMultipleComponent,
    QuestionTypeStringComponent,
    NavbarComponent
  ]
})
export class SharedModule {}
