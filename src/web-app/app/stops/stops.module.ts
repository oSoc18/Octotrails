import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarouselModule } from '../my-octotrails-ng6-carousel';
import { MapBoxComponent } from '../map-box/map-box.component';

import { SharedModule } from '../shared/shared.module';
import { StopsRoutingModule } from './stops-routing.module';

import { StopSearchComponent } from './search/stop-search.component';
import { StopDetailComponent } from './detail/stop-detail.component';
import { StopLocationComponent } from './location/stop-location.component';
import { StopImageDetailComponent } from './image-detail/stop-image-detail.component';

@NgModule({
  imports: [CarouselModule, SharedModule, StopsRoutingModule],
  declarations: [
    MapBoxComponent,
    StopSearchComponent,
    StopDetailComponent,
    StopLocationComponent,
    StopImageDetailComponent
  ],
  exports: [RouterModule, CarouselModule]
})
export class StopsModule {}

export function StopsEntrypoint() {
  return StopsModule;
}
