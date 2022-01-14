import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, EMPTY, map, mergeMap } from 'rxjs';
import { AppState } from '..';
import { ApiListItemRoutes, ApiRoutes } from './../../core/models/api-routes.enum';
import { List } from './../../core/models/list.interface';
import { ApiService } from './../../shared/services/api.service';
import * as ListsActions from './lists.actions';
import { ListsState } from './lists.reducer';

@Injectable()
export class ListsEffects {
  state: ListsState;
  load$ = createEffect(() => this.actions$.pipe(
    ofType(ListsActions.Load),
    mergeMap(() => this.api.get<List[]>(this.api.buildUrl({ route: ApiRoutes.Lists }))
      .pipe(
        map(lists => (ListsActions.Loaded({ payload: lists })))
      ))
  ));
  addList$ = createEffect(() => this.actions$.pipe(
    ofType(ListsActions.Add),
    mergeMap((action) => this.api.post<List>(this.api.buildUrl({ route: ApiRoutes.Lists }), action.payload)
      .pipe(
        map((list) => (ListsActions.ListAdded({ payload: list }))),
        catchError(() => EMPTY)
      ))
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
