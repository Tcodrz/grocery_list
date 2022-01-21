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
        (ListsActions.ItemsRemovedFromList({ payload: list }))))
    })
  ));
  markItemsChecked$ = createEffect(() => this.actions$.pipe(
    ofType(ListsActions.MarkItemsChecked),
    mergeMap((action) => {
      const url = this.api.buildUrl({ route: `${ApiListRoutes.Main}/${ApiListRoutes.MarkItemsChecked}` })
      return this.api.post<List>(url, action).pipe(
        map(list => (ListsActions.ItemsChecked({ payload: list }))))
    })
  ));
  itemsUnCheck$ = createEffect(() => this.actions$.pipe(
    ofType(ListsActions.ItemsUnCheck),
    mergeMap((action) => {
      const url = this.api.buildUrl({ route: `${ApiListRoutes.Main}/${ApiListRoutes.ItemsUnCheck}` })
      return this.api.post<List>(url, action).pipe(
        map(list => (ListsActions.ItemsChecked({ payload: list })))
      )
    })
  ));
  deleteList$ = createEffect(() => this.actions$.pipe(
    ofType(ListsActions.DeleteList),
    mergeMap((action) => {
      const url = this.api.buildUrl({ route: `${ApiListRoutes.Main}/${ApiListRoutes.DeleteList}` });
      return this.api.post<any>(url, action.payload).pipe(
        map(() => (ListsActions.ListDeleted()))
      )
    })
  ));
  updateItem$ = createEffect(() => this.actions$.pipe(
    ofType(ListsActions.UpdateItem),
    mergeMap(({ sListID, item }) => {
      const url = this.api.buildUrl({ route: `${ApiListRoutes.Main}/${ApiListRoutes.UpdateItem}` });
      return this.api.post<List>(url, { sListID, item }).pipe(
        map(list => (ListsActions.ItemUpdated({ payload: list })))
      )
    })
  ))
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private api: ApiService
  ) { this.init(); }
  init(): void {
    this.store.select('listState').subscribe(state => this.state = state);
  }
}
