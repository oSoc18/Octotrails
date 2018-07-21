import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchComponent } from './search/search.component';
import { DetailComponent } from './detail/detail.component';
import { LocationComponent } from './location/location.component';
import { QuestionsEntrypoint } from '../questions/questions.module';

const stopRoutes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: 'search', component: SearchComponent },
  {
    path: ':id',
    children: [
      { path: '', component: DetailComponent },
      { path: 'location', component: LocationComponent },
      { path: 'histories' /*, loadChildren : HistoriesEntryPoint*/ },
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
