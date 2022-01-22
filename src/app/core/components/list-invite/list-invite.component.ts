import { User } from 'src/app/core/models/user.interface';
import * as UsersActions from './../../../state/users/users.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from 'src/app/state';
import { Component, OnInit } from '@angular/core';
import { List } from './../../models/list.interface';
import { Store } from '@ngrx/store';
import * as ListsAction from '../../../state/lists/lists.actions';

@Component({
  selector: 'gl-list-invite',
  templateUrl: './list-invite.component.html',
  styleUrls: ['./list-invite.component.scss']
})
export class ListInviteComponent implements OnInit {
  user: User;
  list: List;
  constructor(
    private activeRoutes: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
  ) { }
  ngOnInit(): void {
    this.store.subscribe(({ listState, userState }) => {
      this.user = userState.user;
      this.list = listState.listInvite;
    })
    this.activeRoutes.params.subscribe(params => {
      const sListID = params['sListID'];
      if (sListID) this.store.dispatch(ListsAction.FetchList({ sListID: sListID as string }));
    });
  }
  onGoToList(): void {
    this.store.dispatch(UsersActions.AddPulicList({ sListID: this.list._id, sUserID: this.user._id }));
    this.router.navigate(['admin']);
  }

}
