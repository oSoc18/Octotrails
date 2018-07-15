import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { CarouselModule } from '../my-octotrails-ng6-carousel';

import { InMemoryDataService } from '../data.mock';

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

import { environment } from '../../environments/environment';
import { StopsRoutingModule } from './stops-routing.module';

import { SearchComponent } from './search/search.component';
import { DetailComponent } from './detail/detail.component';
import { HistoryComponent } from './history/history.component';
import { UpdateComponent } from './update/update.component';

@NgModule({
  imports: [
    CarouselModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatGridListModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatAutocompleteModule,
    StopsRoutingModule,
    !environment.production
      ? HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
          dataEncapsulation: false
        })
      : [],
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC7fP3yZAXe8A667n4LifCkcfrL3zqXGuA'
    })
  ],
  declarations: [
    SearchComponent,
    HistoryComponent,
    UpdateComponent,
    DetailComponent
  ],
  exports: [RouterModule, CarouselModule]
})
export class StopsModule {}

export function StopsEntrypoint() {
  return StopsModule;
}
