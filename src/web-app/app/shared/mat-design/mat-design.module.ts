import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MatButtonModule,
  MatToolbarModule,
  MatGridListModule,
  MatInputModule,
  MatListModule,
  MatIconModule,
  MatDividerModule,
  MatAutocompleteModule,
  MatProgressBarModule
} from '@angular/material';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatGridListModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatAutocompleteModule,
    MatProgressBarModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatToolbarModule,
    MatGridListModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatAutocompleteModule,
    MatProgressBarModule
  ]
})
export class MatDesignModule {}
