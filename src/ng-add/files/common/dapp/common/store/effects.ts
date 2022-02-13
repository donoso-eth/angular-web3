import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { createEffect, ofType, Actions } from "@ngrx/effects";
import { mergeMap, map, catchError, EMPTY, of } from "rxjs";

@Injectable()
export class MovieEffects {
 
  loadMovies$ = createEffect(() => this.actions$.pipe(
    ofType('[Chain] Ready'),
    map( ()=> ({ type: '[Chain] Loaded' } )),
    catchError(() => EMPTY)))

 
  constructor(
    private actions$: Actions,
    private http: HttpClient
  
  ) {}
  getAll() {
    return this.http.get('/movies');
  }
}