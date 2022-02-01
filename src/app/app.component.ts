import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as ListsActions from 'src/app/state/lists/lists.actions';
import { List } from './core/models/list.interface';
import { User } from './core/models/user.interface';
import { AppState } from './state';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  bIsUserLoggedIn$: Observable<boolean>;
  constructor(
    private store: Store<AppState>,
    private db: AngularFirestore,
    private auth: AngularFireAuth
  ) { }
  ngOnInit(): void {
    this.bIsUserLoggedIn$ = this.auth.user;
    this.auth.user.subscribe(u => {
      if (!!u) {
        const user: User = {
          sName: u.displayName,
          sEmail: u.email,
          sProfilePic: u.photoURL,
          id: u.uid,
        }
        this.store.dispatch(ListsActions.Load({ sUserID: user.id }))
      }
    });
  }
}
