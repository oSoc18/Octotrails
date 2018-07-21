import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageNotFoundComponent } from './components/';
import { RangeValidatorDirective } from './directives/range.directive';
import { MatDesignModule } from './mat-design/mat-design.module';

import { NumberComponent } from '../questions/question-types/number/number.component';
import { BooleanComponent } from '../questions/question-types/boolean/boolean.component';
import { MultipleComponent } from '../questions/question-types/multiple/multiple.component';
import { StringComponent } from '../questions/question-types/string/string.component';

@NgModule({
  imports: [CommonModule, MatDesignModule],
  declarations: [
    PageNotFoundComponent,
    RangeValidatorDirective,
    NumberComponent,
    BooleanComponent,
    MultipleComponent,
    StringComponent
  ],
  exports: [
    CommonModule,
    MatDesignModule,
    PageNotFoundComponent,
    RangeValidatorDirective,
    MatDesignModule,
    NumberComponent,
    BooleanComponent,
    MultipleComponent,
    StringComponent
  ]
})
export class SharedModule {}
