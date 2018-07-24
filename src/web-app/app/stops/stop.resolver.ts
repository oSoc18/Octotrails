import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Resolve
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Data } from '../shared/providers/data.provider';
import { Stop } from './stop';
import { StopService } from './stops.service';

@Injectable({
  providedIn: 'root'
})
export class StopResolver implements Resolve<Stop> {
  constructor(private data: Data, private stopService: StopService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Stop> {
    if (this.data.stop) {
      return of(this.data.stop);
    } else {
      const stopId = route.paramMap.get('stop_id');
      return this.stopService.getStop(stopId);
    }
  }
}
