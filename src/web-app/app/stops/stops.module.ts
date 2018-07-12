import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { AgmCoreModule } from "@agm/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { CarouselModule } from "../my-octotrails-ng6-carousel";

import {
  MatButtonModule,
  MatToolbarModule,
  MatGridListModule,
  MatInputModule,
  MatListModule,
  MatIconModule,
  MatDividerModule,
  MatAutocompleteModule
} from "@angular/material";

import { StopsRoutingModule } from "./stops-routing.module";

// import { HeroListComponent } from './list/hero-list.component';
// import { HeroDetailComponent } from './detail/hero-detail.component';
// import { HeroDashboardComponent } from './dashboard/hero-dashboard.component';
import { SearchComponent } from "./search/search.component";
import { DetailComponent } from "./detail/detail.component";
import { HistoryComponent } from "./history/history.component";
import { UpdateComponent } from "./update/update.component";

const routes: Routes = [
  { path: "", redirectTo: "stops/search", pathMatch: "full" },
  { path: "search", component: SearchComponent },
  { path: "search/:id", component: DetailComponent },
  { path: "search/:id/history", component: HistoryComponent },
  { path: "search/:id/update", component: UpdateComponent }
  // { path: 'dashboard', component: HeroDashboardComponent },
  // { path: 'list', component: HeroListComponent },
  // { path: ':id', component: HeroDetailComponent }
];

@NgModule({
  imports: [
    CarouselModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatGridListModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatAutocompleteModule,
    StopsRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyC7fP3yZAXe8A667n4LifCkcfrL3zqXGuA"
    })
  ],
  declarations: [SearchComponent, HistoryComponent, UpdateComponent],
  exports: [RouterModule, CarouselModule]
})
export class StopsModule {}

export function StopsEntrypoint() {
  return StopsModule;
}
