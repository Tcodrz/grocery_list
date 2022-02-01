import { AppState } from 'src/app/state';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from './../../core/models/user.interface';
import * as firebase from 'firebase'
import * as UsersActions from '../../state/users/users.actions';

@Component({
  selector: 'gl-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(
    private store: Store<AppState>,
  ) { }
  ngOnInit(): void { }
  onLogin() {
    const auth = firebase.auth();
    auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((res) => {
        const user: User = {
          sName: res.user.displayName,
          sEmail: res.user.email,
          sProfilePic: res.user.photoURL,
          id: res.user.uid,
        }
        this.store.dispatch(UsersActions.Login({ payload: user }));
      }).catch(error => console.error(error));
  }
}
