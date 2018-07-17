import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { Stop } from '../stops/stop';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  constructor(private http: HttpClient) {}
  private stopsUrl = env.API_URL + 'api/stops';

  findProximityStops(lon: any, lat: any): Observable<Stop[]> {
    let url;
    if (!isNaN(lon) && !isNaN(lat)) {
      url = '/proximity?lon=' + lon + '&lat=' + lat;
    }

    return this.http.get<Object>(this.stopsUrl + url).pipe<Stop[]>(
      map<Object, Stop[]>((res: any) => res.stops.map(st => new Stop(st))),
      catchError(this.handleError('findProximityStops', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
