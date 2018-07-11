import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class StopSearchComponent implements OnInit {

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

// export class StopSearchComponent implements OnInit {
//
//   constructor() { }
//
//   ngOnInit() {
//   }
//
// }
