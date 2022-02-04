import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map } from 'rxjs';
import * as ListsActions from '../lists/lists.actions';
import * as UsersActions from './users.actions';

@Injectable()
export class UsersEffects {
  login$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.Login),
    map((action) => {
      this.db.doc(`users/${action.payload.id}`).get().subscribe(user => {
        const u = user.data();
        if (!u) this.db.doc(`users/${action.payload.id}`).set(action.payload);
      })
      return UsersActions.UserLoggedIn({ payload: action.payload })
    })
  ));
  userLoggedIn$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.UserLoggedIn),
    map((action) => (ListsActions.Load({ sUserID: action.payload.id })))
  ));

  constructor(
    private actions$: Actions,
    private db: AngularFirestore,
  ) { }
}
