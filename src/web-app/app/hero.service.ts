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
        map<Object[], Hero[]>(heroes => heroes.map<Hero>(hero => new Hero(hero['_id'], hero['name'])))
      );
  }

  getHero(id: string): Observable<Hero> {
    this.messageService.add(`HeroService: looking up hero ${id}`);
    return this.http.get<Object>(this.heroesUrl + '/' + id)
      .pipe<Hero>(
        map<Object, Hero>(hero => new Hero(hero['_id'], hero['name']))
      );
  }

  deleteHero(hero: Hero): Observable<Hero> {
    this.messageService.add(`HeroService: Deleting hero ${hero.id}`);
    return this.http.delete<Object>(this.heroesUrl + '/' + hero.id)
      .pipe<Hero>(
        map<Object, Hero>(retHero => new Hero(retHero['_id'], retHero['name']))
      );
  }

  addHero(hero: Hero): Observable<Hero> {
    this.messageService.add(`HeroService: Creating hero ${hero.name}`);
    return this.http.post<Object>(this.heroesUrl, hero)
      .pipe<Hero>(
        map<Object, Hero>(retHero => new Hero(retHero['_id'], retHero['name']))
      );
  }

  searchHeroes(text: string): Observable<Hero[]> {
    return this.http.get<Object[]>(this.heroesUrl + '?name=' + text)
      .pipe<Hero[]>(
        map<Object[], Hero[]>(heroes => heroes.map<Hero>(hero => new Hero(hero['_id'], hero['name'])))
      );
  }

  updateHero(hero: Hero): Observable<Hero> {
    return this.http.put<Object>(this.heroesUrl + '/' +  hero.id, hero)
      .pipe<Hero>(
        map<Object, Hero>(retHero => new Hero(retHero['_id'], retHero['name']))
      );
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
