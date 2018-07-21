import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuestionsEntrypoint } from '../questions/questions.module';
import { HistoriesEntrypoint } from '../histories/histories.module';
import { StopResolver } from './stop.resolver';

import { SearchComponent } from './search/search.component';
import { DetailComponent } from './detail/detail.component';
import { LocationComponent } from './location/location.component';

const stopRoutes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: 'search', component: SearchComponent },
  {
    path: ':stop_id',
    resolve: { stop: StopResolver },
    children: [
      { path: '', component: DetailComponent },
      { path: 'location', component: LocationComponent },
      { path: 'histories', loadChildren: HistoriesEntrypoint },
      {
        path: 'questions',
        loadChildren: QuestionsEntrypoint
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(stopRoutes)],
  exports: [RouterModule]
})
export class StopsRoutingModule {}
