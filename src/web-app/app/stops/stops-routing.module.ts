import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SearchComponent } from './search/search.component';
import { DetailComponent } from './detail/detail.component';
import { HistoryComponent } from './history/history.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  { path: '', redirectTo: 'stops/search', pathMatch: 'full' },
  { path: 'stops', redirectTo: 'heroes/search', pathMatch: 'full' },
  { path: 'stops/search', component: SearchComponent },
  { path: 'stops/:id', component:  DetailComponent },
  { path: 'stops/:id/history', component: HistoryComponent },
  { path: 'stops/:id/update', component: UpdateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class StopsRoutingModule {}
