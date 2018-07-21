import { Component } from '@angular/core';

import { NumberComponent } from 'questions/question-types/number/number.component';
import { BooleanComponent } from 'questions/question-types/boolean/boolean.component';
import { MultipleComponent } from 'questions/question-types/multiple/multiple.component';
import { StringComponent } from 'questions/question-types/string/string.component';

import {
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'Octotrails-starter';
  loading: boolean = true;

  constructor(private router: Router) {
    router.events.subscribe((routerEvent: Event) => {
      this.checkRouterEvent(routerEvent);
    });
  }

  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }

    if (
      routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError
    ) {
      this.loading = false;
    }
  }
}
