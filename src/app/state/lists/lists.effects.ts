import { User } from './../../core/models/user.interface';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, EMPTY, map, mergeMap } from 'rxjs';
import { AppState } from '..';
import { ApiListItemRoutes, ApiRoutes, ApiListRoutes } from './../../core/models/api-routes.enum';
import { List } from './../../core/models/list.interface';
import { ApiService } from './../../shared/services/api.service';
import * as ListsActions from './lists.actions';
import { ListsState } from './lists.reducer';
import * as UsersActions from '../users/users.actions';

@Injectable()
export class ListsEffects {
  state: ListsState;
  load$ = createEffect(() => this.actions$.pipe(
    ofType(ListsActions.Load),
    mergeMap((action) => {
      const url = this.api.buildUrl({ route: `${ApiRoutes.Lists}/${ApiListRoutes.Load}` });
      return this.api.post<List[]>(url, { sUserID: action.sUserID })
        .pipe(
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
  addItemToList$ = createEffect(() => this.actions$.pipe(
    ofType(ListsActions.AddItemToList),
    mergeMap((action) => {
      const url = this.api.buildUrl({ route: `${ApiRoutes.Lists}/${ApiListItemRoutes.Add}` });
      const data = action.payload.item;
      return this.api.post<List>(url, data).pipe(map((list) =>
        ListsActions.ItemsAddedToList({ payload: list }))
      )
    })
  ));
  removeItemsFromList$ = createEffect(() => this.actions$.pipe(
    ofType(ListsActions.RemoveItemsFromList),
    mergeMap((action) => {
      const url = this.api.buildUrl({ route: `${ApiRoutes.Lists}/${ApiListItemRoutes.Remove}` });
      const data = { sListID: action.payload.listID, items: action.payload.items };
      return this.api.post<List>(url, data).pipe(map((list) =>
        (ListsActions.ItemsRemovedFromList({ payload: list })))
      );
    })
  ));

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private api: ApiService
  ) { this.init(); }
  init(): void {
    this.store.select('listState').subscribe(state => this.state = state);
  }
}
