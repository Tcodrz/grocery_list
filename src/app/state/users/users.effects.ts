import { List } from './../../core/models/list.interface';
import { CacheService, AppCacheKeys } from './../../core/services/cache.service';
import { User } from './../../core/models/user.interface';
import { UsersRoutes } from './users-routes';
import { ApiService } from './../../shared/services/api.service';
import { map, mergeMap, mergeMapTo } from 'rxjs';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as UsersActions from './users.actions';
import * as ListsActions from '../lists/lists.actions';

@Injectable()
export class UsersEffects {
  register$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.Register),
    mergeMap((action) => {
      const url = this.api.buildUrl({ route: `${UsersRoutes.Main}/${UsersRoutes.Register}` });
      return this.api.post<{ token: string; user: User }>(url, action.payload)
        .pipe(
          map(res => {
            this.cacheService.cache(AppCacheKeys.Token, res.token);
            this.cacheService.cache(AppCacheKeys.User, res.user);
            return res.user;
          }),
          map(user => (UsersActions.UserLoggedIn({ payload: user }))))
    })
  ));
  login$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.Login),
    map((action) => UsersActions.UserLoggedIn({ payload: action.payload }))
  ));
  userLoggedIn$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.UserLoggedIn),
    map((action) => (ListsActions.Load({ sUserID: action.payload.id })))
  ));
  getUserFromCache$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.GetUserFromCache),
    mergeMap((action) => {
      const url = this.api.buildUrl({ route: `${UsersRoutes.Main}/${UsersRoutes.Auth}` })
      return this.api.post<User>(url, { token: action.payload }).pipe(
        map((user) => (UsersActions.UserLoggedIn({ payload: user }))))
    })));
  addPublicList$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.AddPulicList),
    mergeMap((action) => {
      const url = this.api.buildUrl({ route: `${UsersRoutes.Main}/${UsersRoutes.AddPublicList}` })
      return this.api.post<User>(url, { sListID: action.sListID, sUserID: action.sUserID }).pipe(
        map((user) => (ListsActions.Load({ sUserID: user._id })))
      )
    })
  ));

  constructor(
    private actions$: Actions,
    private api: ApiService,
    private cacheService: CacheService,
  ) { }
}
