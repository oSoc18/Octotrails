import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { Question } from './question';
import { Category } from './category';

const httpOpts = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) {}
  private categoriessUrl = env.API_URL + 'api/categories'; // URL to web api

  /**
   * Get the list of categories
   */
  list(): Observable<Category[]> {
    return this.http.get<Object>(this.categoriessUrl).pipe<Category[]>(
      map(resp => resp['categories'].map(q => new Category(q))),
      catchError(this.handleError('listCategories', []))
    );
  }

  /**
   * Get a specific category by it num.
   */
  getByNum(category_num: string): Observable<Category> {
    const url = this.categoriessUrl + '/' + category_num;
    return this.http.get<Object>(url).pipe<Category>(
      map(resp => new Category(resp['category'])),
      catchError(this.handleError('listCategories', {}))
    );
  }

  /**
   * Get the list of questions for a specific category
   */
  getQuestions(category_num: string): Observable<Question[]> {
    const url = this.categoriessUrl + `/${category_num}/questions`;
    return this.http.get<Object>(url).pipe<Question[]>(
      map(resp => resp['questions'].map(q => new Question(q))),
      catchError(this.handleError('getQuestions', []))
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
