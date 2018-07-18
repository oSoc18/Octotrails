import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { CarouselModule } from '../my-octotrails-ng6-carousel';
import { MapBoxComponent } from '../map-box/map-box.component';

import { environment } from '../../environments/environment';
import { StopsRoutingModule } from './stops-routing.module';
import { MatDesignModule } from '../shared/mat-design/mat-design.module';

import { SearchComponent } from './search/search.component';
import { DetailComponent } from './detail/detail.component';
import { HistoriesComponent } from './histories/histories.component';
import { LocationComponent } from './location/location.component';
import { ImageDetailComponent } from './image-detail/image-detail.component';
import { HistoryComponent } from './history/history.component';

@NgModule({
  imports: [
    CarouselModule,
    CommonModule,
    MatDesignModule,
    StopsRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC7fP3yZAXe8A667n4LifCkcfrL3zqXGuA'
    })
  ],
  declarations: [
    SearchComponent,
    HistoriesComponent,
    DetailComponent,
    LocationComponent,
    ImageDetailComponent,
    MapBoxComponent,
    HistoryComponent
  ],
  exports: [RouterModule, CarouselModule]
})
export class StopsModule {}

export function StopsEntrypoint() {
  return StopsModule;
}
