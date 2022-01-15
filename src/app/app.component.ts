import { map, Observable } from 'rxjs';
import { User } from './core/models/user.interface';
import { CacheService, AppCacheKeys } from './core/services/cache.service';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppState } from './state';
import * as UsersActions from './state/users/users.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  bIsUserLoggedIn$: Observable<boolean>;
  constructor(
    private store: Store<AppState>,
    private cache: CacheService,
  ) { }
  ngOnInit(): void {
    const bIsUser = this.cache.isItem(AppCacheKeys.User);
    if (bIsUser) {
      const user = this.cache.getItem<User>(AppCacheKeys.User);
      this.store.dispatch(UsersActions.GetUserFromCache({ payload: user }));
    }
    this.bIsUserLoggedIn$ = this.store.select('userState').pipe(map(userState => userState.bIsLoggedIn));

  }
}
