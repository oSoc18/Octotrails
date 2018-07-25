import { Component, OnInit } from '@angular/core';
import {
  Route,
  Router,
  ActivatedRoute,
  NavigationExtras
} from '@angular/router';
import { HistoryService } from '../histories.service';
import { History } from '../history';
import { Data } from '../../shared/providers/data.provider';

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
    private historyService: HistoryService,
    private data: Data
  ) {}

  /**
   * Get the stop id
   * Get the stop name
   * Get the history for the stop
   */
  ngOnInit() {
    this.stopId = this.route.parent.snapshot.data['stop'].id;
    this.stopName = this.route.parent.snapshot.data['stop'].alpha['nl'];
    this.histories = this.route.snapshot.data['histories'];
  }

  /**
   * Get the history for the stop by it's id
   * @param stopId The id of the stop
   */
  getStopHistories(stopId?: string) {
    return this.historyService
      .getHistoriesByStopId(this.stopId)
      .subscribe(list => (this.histories = list));
  }

  /**
   * Go to the detail of the history by it's id
   * @param historyId The id of the history
   */
  goToHistoryDetail(historyId) {
    this.router.navigate([historyId], {
      relativeTo: this.route
    });
  }
}
