import { Injectable } from '@angular/core';
import { Stop } from './stop';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from '../../environments/environment';

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

  private createSearchUrl(term: string, by?: string) {
    if (by) return `/search?by=${by}&term=${term}`;

    if (by === 'stop_id' || !isNaN(parseInt(term))) {
      return '/search?by=stop_id&term=' + term;
    } else {
      return '/search?by=stop_name&term=' + term;
    }
  }

  //Get specific stop
  getStop(term: any, by?: string): Observable<Stop> {
    let url = this.createSearchUrl(term, by);
    return this.http.get<Object>(this.stopsUrl + url).pipe<Stop>(
      map(resp => new Stop(resp['stop'])),
      catchError(this.handleError('getStop', {}))
    );
  }

  searchStops(term: string, by?: string): Observable<Stop[]> {
    // if not search term, return empty stop array.
    if (!term.trim()) return of([]);

    let url = this.createSearchUrl(term, by);

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
