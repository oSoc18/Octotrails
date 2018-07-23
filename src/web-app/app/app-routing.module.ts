import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './shared/components/';
import { StopsEntrypoint } from './stops/stops.module';

const appRoutes: Routes = [
  { path: '', redirectTo: 'stops', pathMatch: 'full' },
  { path: 'stops', loadChildren: StopsEntrypoint },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    // RouterModule.forRoot(appRoutes)
    RouterModule.forRoot(appRoutes, { enableTracing: false })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
