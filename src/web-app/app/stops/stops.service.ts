import { Injectable } from '@angular/core';
import { Stop } from './stop';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { SERVER_TRANSITION_PROVIDERS } from '@angular/platform-browser/src/browser/server-transition';

const httpOpts = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class StopService {
  constructor(private http: HttpClient) {}
  private stopsUrl = env.API_URL + 'api/stops'; // URL to web api

  /** GET stop by id. Return `undefined` when id not found */
  getStopsNo404<Data>(id: number): Observable<{} | Stop> {
    const url = `${this.stopsUrl}/search?by=stop_id&term=${id}`;
    return this.http.get<Stop[]>(url);
  }

  //Get specific stop
  getStop(term: any): Observable<Stop> {
    const url = '?by=stop_id&term=' + term;

    // Make a search and only take the first stop result
    return this.searchStops(term).pipe<Stop>(
      map(res => res.pop()),
      catchError(this.handleError('getStop', []))
    );
  }

  searchStops(term: any): Observable<Stop[]> {
    let url;
    if (!term.trim()) {
      // if not search term, return empty stop array.
      return of([]);
    }
    if (isNaN(term)) {
      url = '/search?by=stop_name&term=' + term;
    } else {
      url = '/search?by=stop_id&term=' + term;
    }

    return this.http.get<Object>(this.stopsUrl + url).pipe<Stop[]>(
      map(resp => resp['stops'].map(res => new Stop(res))),
      catchError(this.handleError('searchStops', []))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
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
