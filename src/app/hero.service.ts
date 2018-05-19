import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  constructor(private http: HttpClient, private messageService: MessageService) {}
  private heroesUrl = 'http://localhost:4040/api/heroes';  // URL to web api

  /** GET hero by id. Return `undefined` when id not found */
  getHeroNo404<Data>(id: number): Observable<{} | Hero> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Hero[]>(url);
  }

  /** GET heroes from the server */
  getHeroes (): Observable<Hero[]> {
    return this.http.get<Object[]>(this.heroesUrl)
      .pipe<Hero[]>(
        map<Object[], Hero[]>(heroes => heroes.map<Hero>(hero => ( {name: hero['name'], id: hero['_id']})))
      );
  }

  getHero(id: string): Observable<Hero> {
    this.messageService.add(`HeroService: looking up hero ${id}`);
    return this.http.get<Hero>(this.heroesUrl + '/' + id);
  }


  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
