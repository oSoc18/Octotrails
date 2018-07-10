import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import {
  MatButtonModule,
  MatToolbarModule,
  MatGridListModule,
  MatInputModule,
  MatListModule,
  MatIconModule,
  MatDividerModule,
  MatAutocompleteModule
} from '@angular/material';

import { LinesRoutingModule } from './lines-routing.module';

import { LineListComponent } from './list/line-list.component';
import { LineDetailComponent } from './detail/line-detail.component';


@NgModule({
  imports: [
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
    LinesRoutingModule,
  ],
  declarations: [
    LineListComponent,
    LineDetailComponent
  ],
  exports: [RouterModule]
})
export class LinesModule {}
