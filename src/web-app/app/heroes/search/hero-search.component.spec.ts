import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroSearchComponent } from './hero-search.component';
import {MatAutocompleteModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Injectable} from '@angular/core';
import {HeroService} from '../hero.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@Injectable({
  providedIn: 'root'
})
export class FormControl {}

describe('HeroSearchComponent', () => {
  let component: HeroSearchComponent;
  let fixture: ComponentFixture<HeroSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroSearchComponent ],
      imports: [
        MatAutocompleteModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      providers: [
        FormControl,
        {provide: HeroService, use: jasmine.createSpyObj('HeroService', ['.getHero'])}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
