import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './shared/components/';
import { StopsEntrypoint } from './stops/stops.module';

import { DetailComponent } from './stops/detail/detail.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/stops', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    // RouterModule.forRoot(appRoutes)
    RouterModule.forRoot(appRoutes, { enableTracing: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
