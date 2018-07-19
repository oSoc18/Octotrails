import { Component, OnInit } from '@angular/core';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { HistoryService } from '../histories.service';
import { History } from '../history';

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.css']
})
export class HistoryDetailComponent implements OnInit {

  stopId: string;
  stopName: string;
  historyId: string;
  history: History;

  constructor(
    private route: ActivatedRoute,
    private historyService: HistoryService
  ) {}

  ngOnInit() {
    this.stopId = this.route.snapshot.queryParamMap.get('stop_id');
    this.stopName = this.route.snapshot.queryParamMap.get('stop_name');
    this.historyId = this.route.snapshot.paramMap.get('history_id');
    this.getHistory(this.historyId);
  }

  getHistory(historyId: string) {
    return this.historyService
      .getHistory(historyId)
      .subscribe(history => (this.history = history));
  }

}
