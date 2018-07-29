import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngstack/translate';

// import ngx-translate and the http loader

import { HttpClient } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { environment } from '../environments/environment';
import { InMemoryDataService } from './data.mock';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

/* Feature Modules */
import { SharedModule } from './shared/shared.module';
import { TranslateService } from './shared/services/translate.service';

export function setupTranslateFactory(service: TranslateService): Function {
  service.supportedLangs = ['fr', 'en'];
  return () => service.use('en');
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    HttpClientModule,

    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production
    }),
    // !environment.production
    //   ? HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
    //       dataEncapsulation: false,
    //       passThruUnknownUrl: true
    //     })
    //   : [],
    SharedModule,
    AppRoutingModule // Module import order matters
  ],
  declarations: [AppComponent],
  providers: [
    // TranslateService,
    {
      provide: APP_INITIALIZER,
      useFactory: setupTranslateFactory,
      deps: [TranslateService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
