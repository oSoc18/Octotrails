import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SearchComponent } from './search/search.component';
import { DetailComponent } from './detail/detail.component';
import { LocationComponent } from './location/location.component';

const routes: Routes = [
  { path: '', redirectTo: 'stops/search', pathMatch: 'full' },
  { path: 'stops', redirectTo: 'stops/search', pathMatch: 'full' },
  { path: 'stops/search', component: SearchComponent },
  { path: 'stops/:id', component: DetailComponent },
  // { path: 'stops/:id/history', component: HistoriesComponent },
  { path: 'stops/:id/questions', redirectTo: 'questions', pathMatch: 'full' },
  { path: 'stops/:id/location', component: LocationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class StopsRoutingModule {}
