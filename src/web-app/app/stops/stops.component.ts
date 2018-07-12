import { Component, OnInit } from '@angular/core';
import { Stop } from './stop';
import { StopService } from './stops.service';

@Component({
  selector: 'app-stops',
  templateUrl: './stops.component.html',
  styleUrls: ['./stops.component.scss']
})
export class StopsComponent implements OnInit {
  stops: Stop[];
  selectedStop: Stop;

  constructor(private stopService: StopService) {}

  ngOnInit() {
    debugger;
    this.getStops();
  }

  onSelect(stop: Stop): void {
    this.selectedStop = stop;
  }

  getStops(): void {
    this.stopService.getStops().subscribe(stops => (this.stops = stops, console.log(stops)));
  }

  // add(name: string): void {
  //   name = name.trim();
  //   if (!name) {
  //     return;
  //   }
  //   this.heroService.addHero({ name } as Hero).subscribe(hero => {
  //     this.heroes.push(hero);
  //   });
  // }

  // delete(hero: Hero): void {
  //   this.heroes = this.heroes.filter(h => h !== hero);
  //   this.heroService.deleteHero(hero).subscribe();
  // }
}
