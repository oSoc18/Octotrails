import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { CarouselModule } from '../my-octotrails-ng6-carousel';

import { InMemoryDataService } from '../data.mock';

import { environment } from '../../environments/environment';
import { StopsRoutingModule } from './stops-routing.module';
import { MatDesignModule } from '../shared/mat-design/mat-design.module';

import { SearchComponent } from './search/search.component';
import { DetailComponent } from './detail/detail.component';
import { HistoryComponent } from './history/history.component';
import { UpdateComponent } from './update/update.component';

@NgModule({
  imports: [
    CarouselModule,
    CommonModule,
    MatDesignModule,
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
