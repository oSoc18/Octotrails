import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// import { MessageComponent } from '../shared/components';

import { SearchComponent } from './search/search.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'stops/search', pathMatch: 'full' },
  { path: 'stops', redirectTo: 'heroes/search', pathMatch: 'full' },
  { path: 'stops/search', component: SearchComponent },
  { path: 'stops/:id', component:  DetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class StopsRoutingModule {}
