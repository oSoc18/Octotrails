import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';


import { Stop } from '../stop';
import { StopService } from '../stops.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  @Input() stop: Stop;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private stopService: StopService,
    private location: Location,
  ) { }

  ngOnInit() {
    this.getStop();
  }

  getStop(): void {
    const id: string = this.route.snapshot.paramMap.get('id');
    this.stopService.getStop(id).subscribe(stop => (this.stop = stop));
  }

  goBack(): void {
    this.location.back();
  }

  // gotoStops(stop: Stop) {
  //   let stopId = stop ? stop.id : null;
  //   // Pass along the hero id if available
  //   // so that the HeroList component can select that hero.
  //   // Include a junk 'foo' property for fun.
  //   this.router.navigate(['/stops', { id: stopId, foo: 'foo' }]);
  // }

}
