import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesComponent } from './heroes.component';
import { MatDividerModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatListModule, MatToolbarModule} from '@angular/material';
import { AppRoutingModule } from '../app-routing.module';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { FormsModule } from '@angular/forms';
import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import {Observable, of} from 'rxjs';
import {HeroService} from '../hero.service';

@Component({selector:'app-'});

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;


  beforeEach(async(() => {
    const getHeroes = jasmine.createSpy('getHeroes', () => {return of({})});
    const heroService = {getHeroes: getHeroes};

    TestBed.configureTestingModule({
      declarations: [
        HeroesComponent,
        HeroDetailComponent
      ],
      imports: [
        MatIconModule,
        MatFormFieldModule,
        MatDividerModule,
        RouterModule,
        MatToolbarModule,
        MatListModule,
        MatGridListModule,
        FormsModule
      ],
      providers: [
        {provide: HeroService, useValue: heroService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
