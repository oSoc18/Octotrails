import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Location } from '@angular/common';

import { Stop } from '../stop';
import { StopService } from '../stops.service';
import {
  ICarouselConfig,
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
    'https://picsum.photos/1920/1080/?image=1074',
    'https://picsum.photos/1920/1080/?image=1080'
  ];

  public config = {
    verifyBeforeLoad: true,
    log: false,
    animation: true,
    animationType: AnimationConfig.APPEAR,
    autoplay: true,
    autoplayDelay: 2000,
    stopAutoplayMinWidth: 768
  };

  enabledCaroussel = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private stopService: StopService,
    private location: Location,
    private data: Data
  ) {}

  ngOnInit() {
    if (this.data.stop) {
      this.stop = this.data.stop;
    } else {
      this.getStop();
    }
  }

  getStop(): void {
    const id: string = this.route.snapshot.paramMap.get('id');
    const by: string = this.route.snapshot.queryParamMap.get('by');
    this.stopService.getStop(id, by).subscribe(stop => (this.stop = stop));
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

  goToQuestions() {
    const extras: NavigationExtras = {
      queryParams: {
        stop_id: this.stop.id
      }
    };
    this.router.navigate(['/questions'], extras);
  }

  goToHistories() {
    this.router.navigate(['/histories'], {
      queryParams: {
        stop_id: this.stop.id,
        stop_name: this.stop.alpha['nl']
      }
    });
  }

  readURL(input) {
    // console.log(input, input.target.files, input.target.files[0]);
    if (input.target.files && input.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(input.target.files[0]);

      reader.onload = e => {
        this.loadImage(reader.result);
      };
    }
  }

  private loadImage(img) {
    this.enabledCaroussel = false;

    setTimeout(() => {
      this.imageSources = [img, ...this.imageSources];

      this.config = { ...this.config };
      this.enabledCaroussel = true;
    }, 300);
  }

  update(): void {
    //this.stopService.updateStop(this.stop, this.data.inputs).subscribe(() => this.goBack());
  }

  history(): void {}
}
