import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroDetailComponent } from './hero-detail.component';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
import {HeroService} from '../hero.service';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroDetailComponent ],
      imports: [
        FormsModule
      ],
      providers: [
        {provide: ActivatedRoute, use: jasmine.createSpyObj('ActivatedRoute', ['.snapshot.paramMap.get'])},
        {provide: Location, use: jasmine.createSpyObj('Location', ['.location.back'])},
        {provide: HeroService, use: jasmine.createSpyObj('HeroService', ['.getHero'])}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
