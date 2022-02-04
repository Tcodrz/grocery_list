import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/state';
import { List } from './../../../core/models/list.interface';
import { User } from './../../../core/models/user.interface';
import { ModalParams } from './../../services/modal-generic.service';

@Component({
  selector: 'gl-modal-list-edit',
  templateUrl: './modal-list-edit.component.html',
  styleUrls: ['./modal-list-edit.component.scss']
})
export class ModalListEditComponent implements OnInit {
  @Input() params: ModalParams;
  users$: Observable<User[]>;
  list: List;
  aSelectedItems: User[];
  bIsTitleEditable: boolean;
  constructor(
    private db: AngularFirestore,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.list = { ...this.params.inputs.list };
    this.users$ = this.db.collection<User>('users').valueChanges();
    this.store.select('userState').subscribe(userState => {
      this.bIsTitleEditable = userState.user.id === this.list.sListAdminID;
    });
  }

}
