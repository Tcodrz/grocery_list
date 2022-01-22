import { AppState } from '../state';
import { Component, OnInit } from '@angular/core';
import { List } from './../core/models/list.interface';
import { Store } from '@ngrx/store';
import { User } from './../core/models/user.interface';

@Component({
  selector: 'gl-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  user: User;
  usersLists: List[];
  bIsLoading = true;
  iActiveList: number;
  iTabIndex: number;
  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.store.subscribe(({ listState, userState }) => {
      this.user = userState.user;
      this.usersLists = listState.lists;
      this.iActiveList = listState.iCurrentList;
      this.bIsLoading = false;
    });
  }

}
