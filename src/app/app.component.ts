import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import * as ListsActions from 'src/app/state/lists/lists.actions';
import { User } from './core/models/user.interface';
import { AppState } from './state';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  bIsUserLoggedIn: boolean;
  bIsLoading: boolean = true;
  constructor(
    private store: Store<AppState>,
    private auth: AngularFireAuth
  ) { }
  ngOnInit(): void {
    this.auth.user.subscribe(u => {
      this.bIsUserLoggedIn = !!u;
      this.bIsLoading = false;
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
