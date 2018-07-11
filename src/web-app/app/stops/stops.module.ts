import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { CarouselModule  } from 'angular4-carousel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { InMemoryDataService } from './stops.mock';

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

import { StopsRoutingModule } from './stops-routing.module';

// import { HeroListComponent } from './list/hero-list.component';
// import { HeroDetailComponent } from './detail/hero-detail.component';
// import { HeroDashboardComponent } from './dashboard/hero-dashboard.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: '', redirectTo: 'stops/search', pathMatch: 'full' },
  { path: 'search', component: SearchComponent },
  // { path: 'dashboard', component: HeroDashboardComponent },
  // { path: 'list', component: HeroListComponent },
  // { path: ':id', component: HeroDetailComponent }
];

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
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
       dataEncapsulation: false
     }),
     AgmCoreModule.forRoot({
       apiKey: 'AIzaSyC7fP3yZAXe8A667n4LifCkcfrL3zqXGuA'
     })
  ],
  declarations: [
    SearchComponent
  ],
  exports: [RouterModule]
})
export class StopsModule {}

export function StopsEntrypoint() {
  return StopsModule;
}
