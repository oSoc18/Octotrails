import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  PageNotFoundComponent,
  QuestionTypeBooleanComponent,
  QuestionTypeMultipleComponent,
  QuestionTypeNumberComponent,
  QuestionTypeStringComponent,
  NavbarComponent
} from './components/';
import { TranslatePipe } from './pipes/translate.pipe';
import { RangeValidatorDirective } from './directives/range.directive';
import { MatDesignModule } from './mat-design/mat-design.module';
import { TranslateService } from './services/translate.service';

export function setupTranslateFactory(service: TranslateService): Function {
  service.supportedLangs = ['fr', 'nl'];
  service.defaultLang = 'fr';
  return () => service.use('fr');
}

@NgModule({
  imports: [CommonModule, MatDesignModule],
  declarations: [
    PageNotFoundComponent,
    RangeValidatorDirective,
    TranslatePipe,
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
    TranslatePipe,
    MatDesignModule,
    QuestionTypeNumberComponent,
    QuestionTypeBooleanComponent,
    QuestionTypeMultipleComponent,
    QuestionTypeStringComponent,
    NavbarComponent
  ],
  providers: [
    // TranslateService
    {
      provide: APP_INITIALIZER,
      useFactory: setupTranslateFactory,
      deps: [TranslateService],
      multi: true
    }
  ]
})
export class SharedModule {}
