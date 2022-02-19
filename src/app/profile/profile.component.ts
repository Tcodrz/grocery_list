import { ModalGenericService } from './../shared/services/modal-generic.service';
import * as ListsActions from 'src/app/state/lists/lists.actions';
import { FormGroup, FormBuilder } from '@angular/forms';
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
  userDetails: FormGroup;
  selectedList: any;
  bShowListEdit: boolean;
  bShowTrashList: boolean;
  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private modalService: ModalGenericService,
  ) { }

  ngOnInit(): void {
    this.store.subscribe(state => {
      this.user = state.userState.user;
      this.lists = state.listState.lists;
      this.initUserDetails();
    })
  }
  private initUserDetails(): void {
    // this.userDetails = this.fb.group({
    //   sFirstName: [this.user.sFirstName, null],
    //   sLastName: [this.user.sLastName, null],
    //   sEmail: [this.user.sEmail, null],
    // });
  }
  onUpdateUserDetails(): void {
    this.store.dispatch(UsersActions.UpdateUser({ payload: this.userDetails.value }));
  }
  onSelectList(): void {
    this.bShowListEdit = !!this.selectedList;
    this.bShowTrashList = !!this.selectedList;
  }
  onEditList(): void {
    console.log(this.selectedList);
  }
  onDeleteList(): void {
    if (this.selectedList.items.length > 0) {
      this.modalService.open({
        sComponent: 'confirm',
        sTitle: 'אישור מחיקה',
        sMessage: 'רשימה זו אינה ריקה, למחוק?',
        sIcon: 'pi pi-exclamation-triangle',
        cb: (confirm) => {
          if (confirm) { this.store.dispatch(ListsActions.ListDelete({ payload: this.selectedList })); }
        }
      })
    } else {
      this.store.dispatch(ListsActions.ListDelete({ payload: this.selectedList }));
    }
  }
}
