import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';

import {
  MatButtonModule,
  MatToolbarModule,
  MatGridListModule,
  MatInputModule,
  MatListModule,
  MatIconModule,
  MatDividerModule,
  MatAutocompleteModule
} from '@angular/material';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

/* Feature Modules */
import { SharedModule } from './shared/shared.module';
import { StopsModule } from './stops/stops.module';
// import { LinesModule } from './lines/lines.module';
// import { TestComponent } from './pauline/test/test.component';
import { SearchComponent } from './stops/search/search.component';
import { DetailComponent } from './stops/detail/detail.component';
// import { HistoryComponent } from './octotrails/history/history.component';
// import { CategoriesComponent } from './octotrails/categories/categories.component';
// import { QuestionsComponent } from './octotrails/questions/questions.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatToolbarModule,
    MatGridListModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production
    }),
    SharedModule,
    StopsModule,
    AppRoutingModule // Module import order matters
  ],
  declarations: [AppComponent, DetailComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
