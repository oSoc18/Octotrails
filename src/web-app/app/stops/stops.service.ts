import { Injectable } from "@angular/core";
import { Stop } from "./stop";
import { Observable, of } from "rxjs";
import { map, tap, catchError } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment as env } from "../../environments/environment";
import { SERVER_TRANSITION_PROVIDERS } from "@angular/platform-browser/src/browser/server-transition";
@Injectable({
  providedIn: "root"
})
export class StopService {
  constructor(private http: HttpClient) {}
  private stopsUrl = env.api_url + "api/stops"; // URL to web api

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
        map<Object[], Stop[]>(stops => stops.map<Stop>(stop => new Stop()))
      );
  }

  //Get specific stop
  getStop(term: any): Observable<Stop> {
    let url;
    if (isNaN(term)) {
      url = "?by=stop_name&term=" + term;
    } else {
      url = "?by=stop_id&term=" + term;
    }

    return this.http
      .get<Object>(this.stopsUrl + url)
      .pipe<Stop>(catchError(this.handleError("getStop", [])));
  }

  searchStops(term: any): Observable<Stop[]> {
    let url;
    if (isNaN(term)) {
      url = "/search?by=stop_name&term=" + term;
    } else {
      url = "/search?by=stop_id&term=" + term;
    }

    return this.http.get<Object>(this.stopsUrl + url).pipe<Stop[]>(
      map<Object, Stop>((retStop : any) => retStop.stops),
      catchError(this.handleError("searchStops", []))
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
  private handleError<T>(operation = "operation", result?: T) {
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
