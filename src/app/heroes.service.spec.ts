import { TestBed, inject } from '@angular/core/testing';

import { HeroService } from './hero.service';
import {HttpClient, HttpHandler} from '@angular/common/http';

describe('HeroesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HeroService,
        HttpClient,
        HttpHandler
      ]
    });
  });

  it('should be created', inject([HeroService], (service: HeroService) => {
    expect(service).toBeTruthy();
  }));
});
