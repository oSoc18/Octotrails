import { Injectable } from '@angular/core';
import { Stop } from './stop';
import { Observable, of } from 'rxjs';
import { map, catchError, first, take, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { History } from '../histories/history';

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

  /**
   * Check if the term is an id or a stop
   * @param term The id or name that the user put in
   */
  private getSearchBy(term: string): string {
    if (isNaN(parseInt(term))) {
      return 'stop_name';
    } else {
      return 'stop_id';
    }
  }

  /**
   * Make a url for the api
   * @param term The id or name that the user put in
   * @param by stop_id or stop_name
   */
  private createSearchUrl(term: string, by?: string) {
    if (by) return `/search?by=${by}&term=${term}`;

    if (by === 'stop_id' || !isNaN(parseInt(term))) {
      return '/search?by=stop_id&term=' + term;
    } else {
      return '/search?by=stop_name&term=' + term;
    }
  }

  /**
   * Get specific stop
   * @param term The id or name that the user put in
   */
  getStop(term: any): Observable<Stop> {
    let by = this.getSearchBy(term);
    let url = this.createSearchUrl(term, by);

    return this.http.get<Object>(this.stopsUrl + url).pipe<Stop>(
      map(resp => new Stop(resp['stop'])),
      catchError(this.handleError('getStop', {}))
    );
  }

  /**
   * Search by id or name
   * @param term The id or name that the user put in
   */
  searchStops(term: string): Observable<Stop[]> {
    // if not search term, return empty stop array.
    if (!term.trim()) return of([]);

    let by = this.getSearchBy(term);

    if (by == 'stop_id') {
      return this.getStop(term).pipe(map(stop => [stop]));
    } else {
      let url = this.createSearchUrl(term, by);

      return this.http.get<Object>(this.stopsUrl + url).pipe<Stop[]>(
        map(resp => resp['stops'].map(res => new Stop(res))),
        catchError(this.handleError('searchStops', []))
      );
    }
  }

  /**
   * Get the most recent update made for thte stop.
   * @param stopId The current stop ID
   */
  getMostRecentHistory(stopId: string): Observable<History> {
    const url = this.stopsUrl + '/' + stopId + '/histories?limit=1';

    return this.http.get<Object>(url).pipe<History>(
      map(resp => resp['histories'][0]),
      map<any, History>(data => {
        return data ? new History(data) : null;
      }),
      catchError(this.handleError('searchStops', new History({})))
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
