import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatAutocompleteModule, MatFormFieldModule, MatGridListModule, MatToolbarModule} from '@angular/material';
import { MessagesComponent} from './messages/messages.component';
import { FormControl, FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

@Component({selector: 'app-hero-search', template: ''})
export class HeroSearchComponent {}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeroSearchComponent,
        MessagesComponent,
      ],
      imports: [
        RouterTestingModule,
        MatGridListModule,
        MatToolbarModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        FormsModule
      ],
      providers: [

      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('My App');
  }));
});
