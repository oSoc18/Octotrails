import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MessageComponent } from '../shared/components';

// import { HeroListComponent } from './list/hero-list.component';
// import { HeroDetailComponent } from './detail/hero-detail.component';
// import { HeroDashboardComponent } from './dashboard/hero-dashboard.component';
import { StopSearchComponent } from './search/search.component';

const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: 'search', component: StopSearchComponent }

  // { path: 'stops/:id', component: StopDetailComponent },
  // ,
  // { path: 'heroes/list', component: HeroListComponent },
  // { path: 'heroes/dashboard', component: HeroDashboardComponent },
  // { path: 'heroes/:id', component: HeroDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class StopsRoutingModule {}
