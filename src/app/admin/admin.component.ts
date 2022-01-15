import { ModalGenericService, ModalParams } from './../shared/services/modal-generic.service';
import { UsersGetService } from './../core/services/users-get.service';
import { User } from './../core/models/user.interface';
import { List } from './../core/models/list.interface';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from '../state';
import * as UsersActions from '../state/users/users.actions';
import * as ListsActions from '../state/lists/lists.actions';

@Component({
  selector: 'gl-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  user: User;
  usersLists: List[] = [];
  iActiveList: number;
  constructor(
    private activeRoutes: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private modals: ModalGenericService,
  ) { }

  ngOnInit(): void {
    this.activeRoutes.params.subscribe(({ sUserID }) => {
      this.store.dispatch(ListsActions.Load({ sUserID: sUserID }));
    });

    this.store.subscribe(({ listState, userState }) => {
      this.user = userState.user;
      this.usersLists = listState.lists;
      this.iActiveList = listState.iCurrentList;
      if (this.usersLists.length > 0) this.router.navigate(['admin/lists']);
    });
  }
  onAddList(): void {
    this.modals.open({ sComponent: 'add-list', sTitle: 'הוספת רשימה' });
  }

}
