import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Stop } from '../stop';
import { StopService } from '../stops.service';
import {
  ICarouselConfig,
  CarouselService,
  AnimationConfig
} from '../../my-octotrails-ng6-carousel';

import { slideInDownAnimation } from '../../shared/animations';
import { Data } from '../../shared/providers/data.provider';

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
  ];

  public config: ICarouselConfig = {
    verifyBeforeLoad: true,
    log: true,
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
    private data: Data,
    private carouselService: CarouselService
  ) {
    console.log(JSON.stringify(this.data.stop));
  }

  ngOnInit() {
    if (this.data.stop) {
      this.stop = this.data.stop;
    } else {
      this.getStop();
    }


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

  readURL(input) {
    console.log(input, input.target.files, input.target.files[0]);
    if (input.target.files && input.target.files[0]) {
        console.log(`JA`);
        const reader = new FileReader();

        reader.onload = e => {
          console.log("Load image")
          this.imageSources.push('https://picsum.photos/1920/1080');

          console.log(this.imageSources);
        };

        reader.readAsDataURL(input.target.files[0]);
        this.carouselService.init(this.imageSources, this.config);
    }


  }

  update(): void {
    //this.stopService.updateStop(this.stop, this.data.inputs).subscribe(() => this.goBack());
  }

  history(): void {}
}
