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

  constructor(private location: Location, private router: Router) {}

  ngOnInit() {
    // const stopId = this.router.url.split('/stops/')[1];
    this.isOnHistoriesPage = this.router.url.includes('/histories');
    this.isOnStopsSearchPage = this.router.url.includes('/stops/search');
  }

  goBack(): void {
    this.router.navigate(['..']);
  }
}
