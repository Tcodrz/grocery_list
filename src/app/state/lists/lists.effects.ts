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
    mergeMap((action) => {
      return this.db.collection<List>('lists').valueChanges()
        .pipe(
          map(lists => lists.filter(list => list.aUserIDs.includes(action.sUserID))),
          map(lists => (ListsActions.Loaded({ payload: lists })))
        )
    })
  ));
  addList$ = createEffect(() => this.actions$.pipe(
    ofType(ListsActions.Create),
    mergeMap((action) => {
      const { list, sUserID } = action.payload;
      return from(this.db.collection('lists').add(list))
        .pipe(
          map((res) => {
            const newList = { ...list, id: res.id };
            this.db.doc(`lists/${res.id}`).set(newList);
            return ListsActions.ListCreated({ payload: newList });
          }),
          catchError(() => EMPTY)
        )
    })
  ));
  addItem$ = createEffect(() => this.actions$.pipe(
    ofType(ListsActions.ItemAdd),
    map(action => {
      const { list, item } = action.payload;
      const newItem = { ...item, id: this.db.createId() };
      const newList = { ...list, items: list.items.concat(newItem) };
      this.db.doc(`lists/${list.id}`).set(newList);
      return ListsActions.ItemAdded({ payload: newList });
    })
  ));
  update$ = createEffect(() => this.actions$.pipe(
    ofType(ListsActions.Update),
    map((action) => {
      const list = { ...action.payload };
      this.db.doc(`lists/${list.id}`).set(list);
      return ListsActions.Updated({ payload: list })
    })
  ));
  delete$ = createEffect(() => this.actions$.pipe(
    ofType(ListsActions.ListDelete),
    map((action) => {
      this.db.doc(`lists/${action.payload.id}`).delete();
      return ListsActions.ListDeleted({ payload: action.payload });
    })
  ));
  fetchList$ = createEffect(() => this.actions$.pipe(
    ofType(ListsActions.ListFetch),
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
          if (!list.aUserIDs.includes(userID)) {
            const aUserIDs = list.aUserIDs.concat(userID);
            const newList = { ...list, aUserIDs: aUserIDs, bIsPublic: true }
            this.db.doc(`lists/${list.id}`).set(newList);
          }
          return ListsActions.ListCreated({ payload: list });
        })
      )
    })
  ));
  removeUserFromList$ = createEffect(() => this.actions$.pipe(
    ofType(ListsActions.RemoveUserFromList),
    map(action => {
      const { userID, list } = action.payload;
      const newList = { ...list, aUserIDs: list.aUserIDs.filter(uid => uid !== userID) };
      this.db.doc(`lists/${list.id}`).set(newList);
      return ListsActions.UserRemovedFromList({ payload: newList });
    })
  ));
  clearList$ = createEffect(() => this.actions$.pipe(
    ofType(ListsActions.ListClear),
    map(action => {
      const list = action.payload;
      const newList = { ...list, items: [] };
      this.db.doc(`lists/${list.id}`).set(newList);
      return ListsActions.ListCleared({ payload: newList });
    })
  ))
  constructor(
    private actions$: Actions,
    private db: AngularFirestore,
  ) { }
}
