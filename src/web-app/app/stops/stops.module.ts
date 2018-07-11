import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
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

import { stopsRoutingModule } from './stops-routing.module';

// import { HeroListComponent } from './list/hero-list.component';
// import { HeroDetailComponent } from './detail/hero-detail.component';
// import { HeroDashboardComponent } from './dashboard/hero-dashboard.component';
import { StopSearchComponent } from './search/search.component';

const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: 'search', component: StopSearchComponent },
  // { path: 'dashboard', component: HeroDashboardComponent },
  // { path: 'list', component: HeroListComponent },
  // { path: ':id', component: HeroDetailComponent }
];

@NgModule({
  imports: [
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
    HeroesRoutingModule
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
       dataEncapsulation: false
     })
  ],
  declarations: [
    // HeroListComponent,
    // HeroDetailComponent,
    // HeroDashboardComponent,
    StopSearchComponent
  ],
  exports: [RouterModule, StopSearchComponent]
})
export class StopsModule {}

export function StopsEntrypoint() {
  return StopsModule;
}
