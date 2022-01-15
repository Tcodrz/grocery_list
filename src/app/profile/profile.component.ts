import * as UsersActions from './../state/users/users.actions';
import { Group } from './../core/models/group.interface';
import { List } from './../core/models/list.interface';
import { User } from './../core/models/user.interface';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppState } from '../state';

@Component({
  selector: 'gl-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;
  lists: List[];
  groups: Group[];
  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.store.subscribe(state => {
      this.user = state.userState.user;
      this.lists = state.listState.lists;
    })
  }

}
