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
    mergeMap((action) => {
      const url = this.api.buildUrl({ route: `${UsersRoutes.Main}/${UsersRoutes.Login}` });
      return this.api.post<{ token: string; user: User }>(url, action.payload).pipe(
        map(res => {
          this.cacheService.cache(AppCacheKeys.Token, res.token);
          this.cacheService.cache(AppCacheKeys.User, res.user);
          ListsActions.Load({ sUserID: res.user._id });
          return res.user;
        }),
        map(user => (UsersActions.UserLoggedIn({ payload: user }))))
    })));
  getLists$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.GetUsersLists),
    mergeMap((action) => {
      const url = this.api.buildUrl({ route: `${UsersRoutes.Main}/${UsersRoutes.GetLists}` });
      return this.api.post<List[]>(url, action.payload).pipe(
        map((lists) => (ListsActions.AddLists({ payload: lists }))))
    })));
  getUserFromCache$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.GetUserFromCache),
    mergeMap((action) => {
      const url = this.api.buildUrl({ route: `${UsersRoutes.Main}/${UsersRoutes.Auth}` })
      return this.api.post<User>(url, { token: action.payload }).pipe(
        map((user) => (UsersActions.UserLoggedIn({ payload: user }))))
    })));
  userLoggedIn$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.UserLoggedIn),
    map((action) => (ListsActions.Load({ sUserID: action.payload._id })))
  ));

  constructor(
    private actions$: Actions,
    private api: ApiService,
    private cacheService: CacheService,
  ) { }
}
