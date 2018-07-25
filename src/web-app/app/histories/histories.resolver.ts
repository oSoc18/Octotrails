import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Resolve
} from '@angular/router';
import { Observable } from 'rxjs';
import { History } from './history';
import { HistoryService } from './histories.service';

@Injectable({
  providedIn: 'root'
})
export class HistoriesResolver implements Resolve<History[]> {
  constructor(private historyService: HistoryService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<History[]> {
    const stopId = route.parent.paramMap.get('stop_id');
    return this.historyService.getHistoriesByStopId(stopId);
  }
}
