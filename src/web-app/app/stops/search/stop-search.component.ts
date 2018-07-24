import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Router } from '@angular/router';

import { Stop } from '../stop';
import { StopService } from '../stops.service';
import { Data } from '../../shared/providers/data.provider';

@Component({
  selector: 'app-stop-search',
  templateUrl: './stop-search.component.html',
  styleUrls: ['./stop-search.component.scss']
})
export class StopSearchComponent implements OnInit {
  stopCtrl: FormControl = new FormControl();
  filteredStops: Observable<any[]>;

  constructor(
    private router: Router,
    private stopService: StopService,
    private data: Data
  ) {}

  ngOnInit(): void {
    this.filteredStops = this.stopCtrl.valueChanges.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.stopService.searchStops(term))
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
