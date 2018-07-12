import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Stop } from '../stop';
import { StopService } from '../stops.service';
import { ICarouselConfig, AnimationConfig } from '../../my-octotrails-ng6-carousel';

import { slideInDownAnimation } from '../../shared/animations';

@Component({
  selector: 'app-detail',
  animations: [slideInDownAnimation],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';

  @Input() stop: Stop;

  public imageSources: string[] = [
   'https://picsum.photos/1920/1080/?random',
   'https://picsum.photos/1920/1080/?random',
   'https://picsum.photos/1920/1080/?random'
  ]

  public config: ICarouselConfig = {
    verifyBeforeLoad: true,
    log: false,
    animation: true,
    animationType: AnimationConfig.SLIDE_OVERLAP,
    autoplay: true,
    autoplayDelay: 2000,
    stopAutoplayMinWidth: 768
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private stopService: StopService,
    private location: Location,
  ) {}

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

  gotoStops(stop: Stop) {
    let stopId = stop ? stop.id : null;
    // Pass along the hero id if available
    // so that the HeroList component can select that hero.
    // Include a junk 'foo' property for fun.
    this.router.navigate(['/stops', { id: stopId, foo: 'foo' }]);
  }

  update(): void {
    //this.stopService.updateStop(this.stop).subscribe(() => this.goBack());
  }

  history(): void {

  }
}
