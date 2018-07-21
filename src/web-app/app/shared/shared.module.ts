import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageNotFoundComponent } from './components/';
import { RangeValidatorDirective } from './directives/range.directive';
import { MatDesignModule } from './mat-design/mat-design.module';

@NgModule({
  imports: [CommonModule, MatDesignModule],
  declarations: [PageNotFoundComponent, RangeValidatorDirective],
  exports: [
    CommonModule,
    PageNotFoundComponent,
    RangeValidatorDirective,
    MatDesignModule
  ]
})
export class SharedModule {}
