import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MessageComponent } from '../shared/components';

import { HeroListComponent } from './list/hero-list.component';
import { HeroDetailComponent } from './detail/hero-detail.component';
import { HeroDashboardComponent } from './dashboard/hero-dashboard.component';
import { HeroSearchComponent } from './search/hero-search.component';

const routes: Routes = [
  { path: '', redirectTo: 'heroes/dashboard', pathMatch: 'full' },
  { path: 'heroes', redirectTo: 'heroes/dashboard', pathMatch: 'full' },
  { path: 'heroes/list', component: HeroListComponent },
  { path: 'heroes/dashboard', component: HeroDashboardComponent },
  { path: 'heroes/:id', component: HeroDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule {}
