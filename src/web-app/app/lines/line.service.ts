import { Injectable } from '@angular/core';
import { Line } from './line';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { MessageService } from '../shared/services/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from '../../environments/environment';

const API_URL_LINES = env.api_url + 'api/lines'; // URL to api/lines

@Injectable({
  providedIn: 'root'
})
export class LineService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  /** Log a LineService msg with the msgService */
  private log(msg: string) {
    this.messageService.add('[LineService] ' + msg);
  }

  /** GET line by number. Return `undefined` when number not found */
  getLineNo404<Data>(number: string): Observable<Line[]> {
    const url = `${API_URL_LINES}/?number=${number}`;
    return this.http.get<Line[]>(url);
  }

  /** GET lines from the server */
  getLines(): Observable<Line[]> {
    console.log(API_URL_LINES);
    return this.http.get<Line[]>(API_URL_LINES).pipe<Line[]>(
      tap(_ => this.log('Fetching lines ...')),
      catchError(this.handleError('Get list of lines', []))
    );
  }

  getLine(lineNumber: string): Observable<Line> {
    this.log('Fetching Line #' + lineNumber);

    const url = API_URL_LINES + '/' + lineNumber;

    return this.http.get<Line>(url).pipe(
      tap(_ => this.log(`Fetched Line #${lineNumber}`)),
      catchError(this.handleError<Line>('getLine number=' + lineNumber))
    );
  }

  /*


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'fetching', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
