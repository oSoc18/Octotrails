import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

import { slideInDownAnimation } from '../../shared/animations';

@Component({
  selector: 'app-hero-detail',
  animations: [slideInDownAnimation],
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';

  @Input() hero: Hero;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getHero();
  }

  getHero(): void {
    const id: string = this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id).subscribe(hero => (this.hero = hero));
  }

  goBack(): void {
    this.location.back();
  }

  gotoHeroes(hero: Hero) {
    let heroId = hero ? hero.id : null;
    // Pass along the hero id if available
    // so that the HeroList component can select that hero.
    // Include a junk 'foo' property for fun.
    this.router.navigate(['/heroes', { id: heroId, foo: 'foo' }]);
  }

  save(): void {
    this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
  }
}
