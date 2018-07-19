import { Component, OnInit } from '@angular/core';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { HistoryService } from '../histiries.service';
import { History } from '../history';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  stopId: string;
  histories: History[];

  constructor(
    private route: ActivatedRoute,
    private historyService: HistoryService
  ) {}

  ngOnInit() {
    this.stopId = this.route.snapshot.queryParamMap.get('stop_id');
    this.getStopHistories();
  }

  getStopHistories(stopId?: string) {
    return this.historyService
      .getHistoriesByStopId(this.stopId)
      .subscribe(list => (this.histories = list));
  }

  getHistory(historyId: string) {
    return this.historyService
      .getHistory(historyId)
      .subscribe(history => (this.histories = [history]));
  }
}
