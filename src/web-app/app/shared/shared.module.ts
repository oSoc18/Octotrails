import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  MessageComponent,
  StarComponent,
  PageNotFoundComponent
} from './components/';
import { RangeValidatorDirective } from './directives/range.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [
    StarComponent,
    MessageComponent,
    PageNotFoundComponent,
    RangeValidatorDirective
  ],
  exports: [
    StarComponent,
    MessageComponent,
    PageNotFoundComponent,
    CommonModule,
    FormsModule,
    RangeValidatorDirective
  ]
})
export class SharedModule {}
