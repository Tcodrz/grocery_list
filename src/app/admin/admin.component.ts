import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as firebase from 'firebase';
import { AppState } from '../state';
import { List } from './../core/models/list.interface';
import { User } from './../core/models/user.interface';
@Component({
  selector: 'gl-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  user: User;
  usersLists: List[];
  publicLists: List[];
  bIsLoading = true;
  iTabIndex: number;
  constructor(
    private store: Store<AppState>,
    private auth: AngularFireAuth,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.auth.user.subscribe(u => {
      if (!!u) {
        const user: User = {
          sName: u.displayName,
          sEmail: u.email,
          sProfilePic: u.photoURL,
          id: u.uid,
        }
        this.user = user;
      }
    });
    this.store.subscribe(({ listState, userState }) => {
      this.usersLists = listState.lists.filter(list => !list.bIsPublic);
      this.publicLists = listState.lists.filter(list => list.bIsPublic);
      this.bIsLoading = false;
    });
  }
  onLogout() {
    firebase.auth().signOut().then(() => this.router.navigate(['']));
  }

}
