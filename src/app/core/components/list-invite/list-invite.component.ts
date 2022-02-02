import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from 'src/app/core/models/user.interface';
import { AppState } from 'src/app/state';
import * as ListsAction from '../../../state/lists/lists.actions';
import { List } from './../../models/list.interface';

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
    private auth: AngularFireAuth,
  ) { }
  ngOnInit(): void {
    this.store.subscribe(({ listState }) => {
      this.list = listState.listInvite;
    })
    this.activeRoutes.params.subscribe(params => {
      const sListID = params['sListID'];
      if (sListID) this.store.dispatch(ListsAction.FetchList({ sListID: sListID as string }));
    });
  }
  onGoToList(): void {
    this.auth.user.subscribe(user => {
      if (!!user) {
        this.store.dispatch(ListsAction.AddUserToList({ payload: { userID: user.uid, listID: this.list.id, } }));
        this.router.navigate(['admin']);
      } else {
        debugger; // should not occur -  if user is not logged in redirect him
      }
    })
  }

}
