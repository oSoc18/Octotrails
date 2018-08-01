import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, pipe } from 'rxjs';

import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
  catchError
} from 'rxjs/operators';

import { Router } from '@angular/router';

import { Stop } from '../stop';
import { StopService } from '../stops.service';
import { Data } from '../../shared/providers/data.provider';
import { TranslateService } from '../../shared/services/translate.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-stop-search',
  templateUrl: './stop-search.component.html',
  styleUrls: ['./stop-search.component.scss']
})
export class StopSearchComponent implements OnInit {
  stopCtrl: FormControl = new FormControl();
  filteredStops: Observable<any[]>;
  isSearching: boolean;

  constructor(
    private router: Router,
    private stopService: StopService,
    private data: Data,
    private translateService: TranslateService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.filteredStops = this.stopCtrl.valueChanges.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(500),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => {
        this.isSearching = true;
        return this.stopService.searchStops(term).pipe(this.afterSearch(term));
      })
    );
  }

  private afterSearch(term) {
    let msg;
    return pipe(
      tap((result: Stop[]) => {
        this.isSearching = false;
        const countStops = result.length;
        if (countStops > 0) msg = `${countStops} stops matching for '${term}'`;
        else msg = `No found stop for '${term}' !!!`;

        this.snackBar.open(msg, 'Close', {
          duration: 3750
        });
      })
    );
  }

  /**
   *LINKING
   */
  showDetails(selected: Stop) {
    this.data.stop = selected;
    this.router.navigate(['/stops/', selected.id]);
  }
}
