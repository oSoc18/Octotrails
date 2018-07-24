import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { Question } from './question';

const httpOpts = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(private http: HttpClient) {}
  private questionsUrl = env.API_URL + 'api/questions'; // URL to web api

  /**
   * Get the list of questions
   */
  getQuestions(): Observable<Question[]> {
    return this.http.get<Object>(this.questionsUrl).pipe<Question[]>(
      map(resp => resp['questions'].map(q => new Question(q))),
      catchError(this.handleError('getQuestions', []))
    );
  }

  /**
   * Save the updates for a stop
   * @param stop_id The Stop ID
   * @param answers List of {question and answer}
   */
  saveAnswers(stop_id, answers) {
    localStorage.clear();

    const url = env.API_URL + 'api/stops/' + stop_id + '/inputs';
    return this.http.post(url, { inputs: answers }, httpOpts).pipe(
      map(resp => resp['message']),
      catchError(this.handleError('saveAnswers', []))
    );
  }

  /**
   * Add the answer to the local storage
   * @param value The answer that the user put in
   */
  storeAnswer(value) {
    localStorage.setItem(value.question_id, value.answer);
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
