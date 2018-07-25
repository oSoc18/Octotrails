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
export class HistoryResolver implements Resolve<History> {
  constructor(private historyService: HistoryService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<History> {
    const historyId = route.paramMap.get('history_id');
    return this.historyService.getHistory(historyId);
  }
}
