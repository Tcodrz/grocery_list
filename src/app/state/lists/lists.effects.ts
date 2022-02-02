import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, from, map, mergeMap } from 'rxjs';
import { List } from './../../core/models/list.interface';
import * as ListsActions from './lists.actions';

@Injectable()
export class ListsEffects {
  load$ = createEffect(() => this.actions$.pipe(
    ofType(ListsActions.Load),
    mergeMap((action) =>
      this.db.collection<List>('lists').valueChanges()
        .pipe(
          map(lists => lists.filter(list => list.aUserIDs.includes(action.sUserID))),
          map(lists => (ListsActions.Loaded({ payload: lists })))
        ))
  ));
  addList$ = createEffect(() => this.actions$.pipe(
    ofType(ListsActions.Add),
    mergeMap((action) => {
      const { list, sUserID } = action.payload;
      return from(this.db.collection('lists').add(list))
        .pipe(
          map((res) => {
            const newList = { ...list, id: res.id };
            this.db.doc(`lists/${res.id}`).set(newList);
            return ListsActions.ListAdded({ payload: newList });
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
  delete$ = createEffect(() => this.actions$.pipe(
    ofType(ListsActions.DeleteList),
    map((action) => {
      this.db.doc(`lists/${action.payload.id}`).delete();
      return ListsActions.ListDeleted({ payload: action.payload });
    })
  ))
  fetchList$ = createEffect(() => this.actions$.pipe(
    ofType(ListsActions.FetchList),
    mergeMap((action) => {
      return this.db.doc<List>(`lists/${action.sListID}`).get()
        .pipe(
          map(res => res.data()),
          map((list) => (ListsActions.ListFetched({ payload: list })))
        );
    })
  ));
  addUserToList$ = createEffect(() => this.actions$.pipe(
    ofType(ListsActions.AddUserToList),
    mergeMap(action => {
      const { userID, listID } = action.payload;
      return this.db.doc<List>(`lists/${listID}`).get().pipe(
        map((res) => res.data() as List),
        map((list: List) => {
          const newList = { ...list, aUserIDs: list.aUserIDs.concat(userID) }
          this.db.doc(`lists/${list.id}`).set(newList);
          return ListsActions.Load({ sUserID: userID });
        })
      )
    })
  ));
  constructor(
    private actions$: Actions,
    private db: AngularFirestore,
  ) { }
}
