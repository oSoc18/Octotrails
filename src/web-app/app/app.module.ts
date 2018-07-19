import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { environment } from '../environments/environment';
import { InMemoryDataService } from './data.mock';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

/* Feature Modules */
import { SharedModule } from './shared/shared.module';
import { StopsModule } from './stops/stops.module';
import { QuestionsModule } from './questions/questions.module';
import { HistoriesModule } from './histories/histories.module';

@NgModule({
  imports: [
    BrowserModule,
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
    StopsModule,
    QuestionsModule,
    HistoriesModule,
    AppRoutingModule // Module import order matters
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
