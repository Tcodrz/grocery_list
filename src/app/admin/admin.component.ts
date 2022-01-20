import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../state';
import * as ListsActions from '../state/lists/lists.actions';
import { List } from './../core/models/list.interface';
import { User } from './../core/models/user.interface';
import { ModalGenericService } from './../shared/services/modal-generic.service';

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
    private activeRoutes: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private modals: ModalGenericService,
  ) { }

  ngOnInit(): void {
    this.store.subscribe(({ listState, userState }) => {
      this.user = userState.user;
      this.usersLists = listState.lists;
      this.iActiveList = listState.iCurrentList;
      this.bIsLoading = false;
    });
  }
  onAddList(): void {
    this.modals.open({ sComponent: 'add-list', sTitle: 'הוספת רשימה' });
  }

}
