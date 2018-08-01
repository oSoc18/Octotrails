import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateService } from '../../services/translate.service';
import { History } from '../../../histories/history';

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
  @Input() lastHistory: History;
  @Input() historyDate;
  @Input() doneBtnDisabled: boolean;
  @Input() autoGoBack: boolean = true;

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

  public get langs(): string[] {
    return this.translateService.supportedLangs;
  }

  public get activeLang(): string {
    return this.translateService.activeLang;
  }

  public set activeLang(lang: string) {
    this.translateService.activeLang = lang;
  }

  constructor(
    private location: Location,
    private router: Router,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.isOnHistoriesPage = this.router.url.includes('/histories');
    this.isOnQuestionsPage = this.router.url.includes('/questions');
    this.isOnCategoriesPage = this.router.url.includes('/categories');
    this.isOnLocationPage = this.router.url.includes('/location');

    // URL must end with the :stop_id to be on /stop-detail page
    this.isOnStopDetailPage =
      this.router.url.search(/stops\/[0-9a-zA-Z]+$/) !== -1;

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

  gotToLastHistory() {
    return this.router.navigate([
      'stops/',
      this.stopId,
      'histories',
      this.lastHistory.id
    ]);
  }

  onGoBack() {
    // Do I handle the goBack navigation ?
    if (!this.autoGoBack) {
      return this.goBack.emit();
    }

    if (this.isOnQuestionsPage) {
      return this.router.navigate(['stops/', this.stopId, 'categories']);
    }

    if (this.historyDate) {
      // On historyDetail page
      return this.router.navigate(['stops/', this.stopId, 'histories']);
    }

    if (this.isOnStopDetailPage) {
      return this.router.navigateByUrl('stops/search');
    }

    return this.router.navigate(['stops/', this.stopId]);
  }

  onDone() {
    this.done.emit();
  }

  onUpload(input: Event) {
    this.upload.emit(input);
  }
}
