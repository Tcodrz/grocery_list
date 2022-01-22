import { Observable, map } from 'rxjs';
import { User } from './../models/user.interface';
import { AppState } from '../../state/index';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import * as UsersActions from '../../state/users/users.actions';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private router: Router,
    private store: Store<AppState>,
  ) { }
  onLogin(user: User, bRegister: boolean, sRoute: string) {
    if (bRegister) this.store.dispatch(UsersActions.Register({ payload: user }));
    else this.store.dispatch(UsersActions.Login({ payload: user }));
    this.store.select('userState').subscribe(state => {
      if (state.bIsLoggedIn) this.router.navigate([sRoute]);
    });
  }
  isUser(): Observable<boolean> { return this.store.select('userState').pipe(map(state => state.bIsUser)); }
  isUserLoggedIn(): Observable<boolean> { return this.store.select('userState').pipe(map(state => state.bIsLoggedIn)); }
  getUser(): Observable<User> { return this.store.select('userState').pipe(map(state => state.user)); }

}
