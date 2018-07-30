import {
  ChangeDetectorRef,
  EventEmitter,
  Injectable,
  OnDestroy,
  Pipe,
  PipeTransform
} from '@angular/core';
import { TranslateService } from '../services/translate.service';

@Injectable()
@Pipe({
  name: 'translate',
  pure: false // required to update the value when the promise is resolved
})
export class TranslatePipe implements PipeTransform, OnDestroy {
  constructor(private translateService: TranslateService) {}
  transform(key: any): any {
    return this.translateService.translations[key] || key;
  }
  ngOnDestroy() {}
}
