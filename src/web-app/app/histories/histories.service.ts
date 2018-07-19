import { Injectable } from '@angular/core';
import { History } from './history';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { Question } from '../questions/question';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  constructor(private http: HttpClient) {}
  private historiesUrl = env.API_URL + 'api/histories'; // URL to web api

  //Get specific history
  getHistory(historyId: string): Observable<History> {
    let url = this.historiesUrl + '/' + historyId;
    return this.http.get<Object>(url).pipe<History>(
      map(resp => new History(resp['history'])),
      catchError(this.handleError('getHistory', {}))
    );
  }

  /**
   * Get the stop histories specified by it ID.
   * @param stopId The stop Id
   */
  getHistoriesByStopId(stopId: string): Observable<History[]> {
    const url = env.API_URL + `api/stops/${stopId}/histories`;
    return this.http.get<Object>(url).pipe<History[]>(
      map(resp => resp['histories'].map(res => new History(res))),
      catchError(this.handleError('getHistoriesByStopId', []))
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
