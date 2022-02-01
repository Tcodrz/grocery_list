import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, EMPTY, map, mergeMap } from 'rxjs';
import { AppState } from '..';
import * as UsersActions from '../users/users.actions';
import { ApiListItemRoutes, ApiListRoutes, ApiRoutes } from './../../core/models/api-routes.enum';
import { List } from './../../core/models/list.interface';
import { User } from './../../core/models/user.interface';
import { ApiService } from './../../shared/services/api.service';
import * as ListsActions from './lists.actions';
import { ListsState } from './lists.reducer';

@Injectable()
export class ListsEffects {
  state: ListsState;
  load$ = createEffect(() => this.actions$.pipe(
    ofType(ListsActions.Load),
    mergeMap((action) => {
      const url = this.api.buildUrl({ route: `${ApiRoutes.Lists}/${ApiListRoutes.Load}` });
      // return this.api.post<List[]>(url, { sUserID: action.sUserID })
      return this.db.collection<List>('lists').valueChanges()
        .pipe(
          map(lists => lists.filter(list => list.aUserIDs.includes(action.sUserID))),
          map(lists => (ListsActions.Loaded({ payload: lists })))
        )
    })
  ));
  addList$ = createEffect(() => this.actions$.pipe(
    ofType(ListsActions.Add),
    mergeMap((action) => {
      const url = this.api.buildUrl({ route: `${ApiRoutes.Lists}/${ApiListRoutes.AddList}` });
      const { list, sUserID } = action.payload;
      return this.api.post<{ list: List, user: User }>(url, { list, sUserID })
        .pipe(
          map(({ list, user }) => {
            this.store.dispatch(UsersActions.UpdateUser({ payload: user }));
            return ListsActions.ListAdded({ payload: list });
          }),
          catchError(() => EMPTY)
        )
    })
  ));
  addItem$ = createEffect(() => this.actions$.pipe(
    ofType(ListsActions.AddItemToList),
    map(action => {
      debugger;
      const { list, item } = action.payload;
      const i = { ...item, id: this.db.createId() };
      const newList = { ...list, items: list.items.concat(i) };
      this.db.doc(`lists/${list.id}`).set(newList);
      return ListsActions.ItemAddedToList({ payload: newList });
    })
  ))
  update$ = createEffect(() => this.actions$.pipe(
    ofType(ListsActions.Update),
    map((action) => {
      const list = action.payload;
      this.db.doc(`lists/${list.id}`).set(list);
      return ListsActions.Updated({ payload: list })
    })
  ));
  fetchList$ = createEffect(() => this.actions$.pipe(
    ofType(ListsActions.FetchList),
    mergeMap((action) => {
      const url = this.api.buildUrl({ route: `${ApiListRoutes.Main}/${ApiListRoutes.GetByID}` });
      return this.api.post<List>(url, { sListID: action.sListID }).pipe(
        map((list) => (ListsActions.ListFetched({ payload: list })))
      );
    })
  ));
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private api: ApiService,
    private db: AngularFirestore,
  ) { this.init(); }
  init(): void {
    this.store.select('listState').subscribe(state => this.state = state);
  }
}
