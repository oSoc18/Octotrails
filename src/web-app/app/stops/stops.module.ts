import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarouselModule } from '../my-octotrails-ng6-carousel';
import { MapBoxComponent } from '../map-box/map-box.component';

import { SharedModule } from '../shared/shared.module';
import { StopsRoutingModule } from './stops-routing.module';

import { SearchComponent } from './search/search.component';
import { DetailComponent } from './detail/detail.component';
import { HistoryComponent } from './history/history.component';
import { LocationComponent } from './location/location.component';
import { ImageDetailComponent } from './image-detail/image-detail.component';

@NgModule({
  imports: [CarouselModule, SharedModule, StopsRoutingModule],
  declarations: [
    SearchComponent,
    HistoryComponent,
    DetailComponent,
    LocationComponent,
    ImageDetailComponent,
    MapBoxComponent
  ],
  exports: [RouterModule, CarouselModule]
})
export class StopsModule {}

export function StopsEntrypoint() {
  return StopsModule;
}
