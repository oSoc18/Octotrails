import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() stopId;
  @Input() stopName;

  isOnHistoriesPage: boolean;
  isOnStopsSearchPage: boolean;
  isOnQuestionsPage: boolean;

  constructor(private location: Location, private router: Router) {}

  ngOnInit() {
    this.isOnHistoriesPage = this.router.url.includes('/histories');
    this.isOnQuestionsPage = this.router.url.includes('/questions');
    this.isOnStopsSearchPage = this.router.url.search(/stops\/[0-9]+$/) !== -1;
    if (!this.isOnStopsSearchPage) {
      this.stopId = this.router.url.match('/stops/([0-9]+[a-zA-z_-]*).*')[1];
    }
  }

  goBack(): void {
    if (this.isOnStopsSearchPage) {
      this.router.navigate(['stops/search']);
    } else {
      this.router.navigate(['stops/', this.stopId]);
    }
  }
}
