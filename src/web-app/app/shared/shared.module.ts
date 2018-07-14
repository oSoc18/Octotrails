import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PageNotFoundComponent } from './components/';
import { RangeValidatorDirective } from './directives/range.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [PageNotFoundComponent, RangeValidatorDirective],
  exports: [
    PageNotFoundComponent,
    CommonModule,
    FormsModule,
    RangeValidatorDirective
  ]
})
export class SharedModule {}
