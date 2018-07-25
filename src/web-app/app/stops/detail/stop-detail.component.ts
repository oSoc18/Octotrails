import {
  Component,
  OnInit,
  Input,
  HostBinding,
  OnDestroy
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Stop } from '../stop';
import { StopService } from '../stops.service';
import { AnimationConfig } from '../../my-octotrails-ng6-carousel';

import { slideInDownAnimation } from '../../shared/animations';
import { Data } from '../../shared/providers/data.provider';

@Component({
  animations: [slideInDownAnimation],
  templateUrl: './stop-detail.component.html',
  styleUrls: ['./stop-detail.component.scss']
})
export class StopDetailComponent implements OnInit, OnDestroy {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';

  @Input() stop: Stop;

  public imageSources: string[];

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
    private data: Data
  ) {}

  ngOnInit() {
    this.stop = this.route.snapshot.data['stop'];
    if (this.stop.images.length > 0) {
      this.imageSources = this.stop.images;
    } else {
      this.imageSources = [
        'https://picsum.photos/1920/1080/?random',
        'https://picsum.photos/1920/1080/?image=1074',
        'https://picsum.photos/1920/1080/?image=1080'
      ];
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.data.stop = this.stop;
  }

  readURL(input) {
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
}
