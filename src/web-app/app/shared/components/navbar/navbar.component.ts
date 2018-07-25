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
  @Input() historyDate;
  @Input() doneBtnDisabled:boolean;
  
  @Input('goBack') goBackCallback: Function;
  @Input('done') doneCallback: Function;


  isOnHistoriesPage: boolean;
  isOnStopDetailPage: boolean;
  isOnQuestionsPage: boolean;
  isOnCategoriesPage: boolean;

  constructor(private location: Location, private router: Router) {}

  ngOnInit() {
    this.isOnHistoriesPage = this.router.url.includes('/histories');
    this.isOnQuestionsPage = this.router.url.includes('/questions');
    this.isOnCategoriesPage = this.router.url.includes('/categories');
    // URL must end with the :stop_id to be on /stop-detail page
    this.isOnStopDetailPage = this.router.url.search(/stops\/[0-9]+$/) !== -1;
    // As the navbar is shown on all page related to specific stop
    if (!this.isOnStopDetailPage) {
      this.stopId = this.router.url.match('/stops/([0-9]+[a-zA-z_-]*).*')[1];
    }
  }

  goBack() {
    if (this.goBackCallback) {
      this.goBackCallback();
      return;
    }

    if (this.isOnStopDetailPage) {
      return this.router.navigate(['stops/search']);
    }

    if (this.historyDate) {
      return this.router.navigate(['stops/', this.stopId, 'histories']);
    }

    return this.router.navigate(['stops/', this.stopId]);
  }
}
