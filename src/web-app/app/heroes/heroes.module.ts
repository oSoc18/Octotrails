import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { InMemoryDataService } from './heroes.mock';

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

import { HeroesRoutingModule } from './heroes-routing.module';

import { HeroListComponent } from './list/hero-list.component';
import { HeroDetailComponent } from './detail/hero-detail.component';
import { HeroDashboardComponent } from './dashboard/hero-dashboard.component';
import { HeroSearchComponent } from './search/hero-search.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: HeroDashboardComponent },
  { path: 'list', component: HeroListComponent },
  { path: ':id', component: HeroDetailComponent }
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
    HeroesRoutingModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false
    })
  ],
  declarations: [
    HeroListComponent,
    HeroDetailComponent,
    HeroDashboardComponent,
    HeroSearchComponent
  ],
  exports: [RouterModule, HeroSearchComponent]
})
export class HeroesModule {}

export function HeroesEntrypoint() {
  return HeroesModule;
}
