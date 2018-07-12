import { Injectable } from '@angular/core';
import { Stop } from './stop';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { MessageService } from '../shared/services/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class StopService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}
  private stopsUrl = env.api_url + 'api/stops'; // URL to web api

  /** GET stop by id. Return `undefined` when id not found */
  getStopsNo404<Data>(id: number): Observable<{} | Stop> {
    const url = `${this.stopsUrl}/?id=${id}`;
    return this.http.get<Stop[]>(url);
  }

  /** GET all stops from the server */
  getStops(): Observable<Stop[]> {
    return this.http
      .get<Object[]>(this.stopsUrl)
      .pipe<Stop[]>(
        map<Object[], Stop[]>(stops =>
          stops.map<Stop>(stop => new Stop(stop['id'], stop['name']))
        )
      );
  }

  //Get specific stop
  getStop(id: string): Observable<Stop> {
    console.log("hello", id);
    this.messageService.add(`StopService: looking up stop ${id}`);
    return this.http
      .get<Object>(this.stopsUrl + '/' + id)
      .pipe<Stop>(
        map<Object, Stop>(stop => new Stop(stop['id'], stop['name']))
      );
  }

  // deleteHero(hero: Hero): Observable<Hero> {
  //   this.messageService.add(`HeroService: Deleting hero ${hero.id}`);
  //   return this.http
  //     .delete<Object>(this.heroesUrl + '/' + hero.id)
  //     .pipe<Hero>(
  //       map<Object, Hero>(retHero => new Hero(retHero['id'], retHero['name']))
  //     );
  // }
  //
  // addHero(hero: Hero): Observable<Hero> {
  //   this.messageService.add(`HeroService: Creating hero ${hero.name}`);
  //   return this.http
  //     .post<Object>(this.heroesUrl, hero)
  //     .pipe<Hero>(
  //       map<Object, Hero>(retHero => new Hero(retHero['id'], retHero['name']))
  //     );
  // }

  //---SEARCH STOPS BY NAME/ID---//

  searchStops(text: string): Observable<Stop[]> {
    return this.http
      .get<Object[]>(this.stopsUrl + '?name=' + text)
      .pipe<Stop[]>(
        map<Object[], Stop[]>(stops =>
          stops.map<Stop>(stop => new Stop(stop['id'], stop['name']))
        )
      );
  }


//---UPDATE STOP---//

  // updateHero(hero: Hero): Observable<Hero> {
  //   return this.http
  //     .put<Object>(this.heroesUrl + '/' + hero.id, hero)
  //     .pipe<Hero>(
  //       map<Object, Hero>(retHero => new Hero(retHero['id'], retHero['name']))
  //     );
  // }


  // /** Log a HeroService message with the MessageService */
  // private log(message: string) {
  //   this.messageService.add('StopService: ' + message);
  // }

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
