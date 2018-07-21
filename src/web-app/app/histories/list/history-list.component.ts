import { Component, OnInit } from '@angular/core';
import {
  Route,
  Router,
  ActivatedRoute,
  NavigationExtras
} from '@angular/router';
import { HistoryService } from '../histories.service';
import { History } from '../history';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.css']
})
export class HistoryListComponent implements OnInit {
  stopId: string;
  stopName: string;
  histories: History[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private historyService: HistoryService
  ) {}

  ngOnInit() {
    this.stopId = this.route.snapshot.queryParamMap.get('stop_id');
    this.stopName = this.route.snapshot.queryParamMap.get('stop_name');
    this.getStopHistories();
  }

  getStopHistories(stopId?: string) {
    return this.historyService
      .getHistoriesByStopId(this.stopId)
      .subscribe(list => (this.histories = list));
  }

  goToHistoryDetail(id) {
    this.router.navigate(['/histories', id], {
      queryParams: {
        stop_id: this.stopId,
        stop_name: this.stopName
      }
    });
  }
}
