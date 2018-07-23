import { Component, OnInit } from '@angular/core';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { HistoryService } from '../histories.service';
import { History } from '../history';

@Component({
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.css']
})
export class HistoryDetailComponent implements OnInit {
  stopId: string;
  stopName: string;
  historyId: string;
  history: History;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.stopId = this.route.parent.snapshot.data['stop'].id;
    this.stopName = this.route.parent.snapshot.data['stop'].alpha['nl'];
    this.historyId = this.route.snapshot.paramMap.get('history_id');
    this.history = this.route.snapshot.data['history'];
  }
}
