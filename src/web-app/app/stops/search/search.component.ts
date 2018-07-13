import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { StopService } from '../stops.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {
  //title: string = 'Search Stop';
  latitude = 50.850346;
  longitude = 4.351721;
  stopCtrl: FormControl = new FormControl();
  filteredStops: Observable<any[]>;

  constructor(private stopService: StopService) {}

  ngOnInit(): void {

    this.filteredStops = this.stopCtrl.valueChanges.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.stopService.searchStops(term)),
    );
  }
}