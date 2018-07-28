import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() title;
  @Input() subTitle;
  @Input() stopId;
  @Input() stopName;
  @Input() historyDate;
  @Input() doneBtnDisabled: boolean;

  @Output('back') goBack: EventEmitter<null> = new EventEmitter<null>();
  @Output() done: EventEmitter<null> = new EventEmitter<null>();
  @Output() upload: EventEmitter<Event> = new EventEmitter<Event>();

  isOnHistoriesPage: boolean;
  isOnStopDetailPage: boolean;
  isOnQuestionsPage: boolean;
  isOnCategoriesPage: boolean;
  isOnLocationPage: boolean;
  headerClass;
  headingClass;

  constructor(private location: Location, private router: Router) {}

  ngOnInit() {
    this.isOnHistoriesPage = this.router.url.includes('/histories');
    this.isOnQuestionsPage = this.router.url.includes('/questions');
    this.isOnCategoriesPage = this.router.url.includes('/categories');
    this.isOnLocationPage = this.router.url.includes('/location');
    // URL must end with the :stop_id to be on /stop-detail page
    this.isOnStopDetailPage = this.router.url.search(/stops\/[0-9]+$/) !== -1;
    // As the navbar is shown on all page related to specific stop
    if (!this.isOnStopDetailPage) {
      this.stopId = this.router.url.match('/stops/([0-9]+[a-zA-z_-]*).*')[1];
    }
    this.headerClass = {
      heading: this.isOnQuestionsPage,
      header: !this.isOnQuestionsPage,
      'stop-detail-header': this.isOnStopDetailPage,
      'categories-header': this.isOnCategoriesPage,
      'location-header': this.isOnLocationPage
    };
    this.headingClass = {
      'stop-detail-header-content': !this.isOnQuestionsPage
    };
  }

  onGoBack() {
    this.goBack.emit();

    if (this.historyDate) {
      return this.router.navigate(['stops/', this.stopId, 'histories']);
    }

    return this.router.navigate(['stops/', this.stopId]);
  }

  OnDone() {
    this.done.emit();
  }

  onUpload(input: Event) {
    this.upload.emit(input);
  }
}
