import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LineListComponent } from './list/line-list.component';
import { LineDetailComponent } from './detail/line-detail.component';

const linesRoutes: Routes = [
  { path: 'lines', redirectTo: 'lines/list', pathMatch: 'full' },
  { path: 'lines/list', component: LineListComponent },
  { path: 'lines/:number', component: LineDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(linesRoutes)],
  exports: [RouterModule]
})
export class LinesRoutingModule {}
