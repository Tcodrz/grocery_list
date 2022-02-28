import { ModalAddListComponent } from './../shared/components/modal-add-list/modal-add-list.component';
import { AppCacheKeys, CacheService } from './../core/services/cache.service';
import { AppState } from '../state';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { List } from './../core/models/list.interface';
import { ModalGenericService } from './../shared/services/modal-generic.service';
import { Store } from '@ngrx/store';
import { User } from './../core/models/user.interface';
import * as ListsActions from '../state/lists/lists.actions';
@Component({
  selector: 'gl-lists',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnChanges {
  @Input() user: User;
  @Input() lists: List[];
  iCurrentIndex: number;
  constructor(
    private modal: ModalGenericService,
    private cache: CacheService,
    private store: Store<AppState>,
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.iCurrentIndex = this.cache.getItem<number>(AppCacheKeys.iActiveList) || 0;
  }
  ngOnInit(): void { }
  onChangeList({ index }) {
    this.iCurrentIndex = index;
    this.cache.cache(AppCacheKeys.iActiveList, index);
  }
  onAddList(): void {
    this.modal.open({
      component: ModalAddListComponent,
      sTitle: 'הוספת רשימה',
      cb: (listName: string) => {
        this.store.dispatch(ListsActions.Create({
          payload: {
            list: {
              sName: listName,
              sListAdminID: this.user.id,
              items: [],
              aUserIDs: [this.user.id],
            },
            sUserID: this.user._id
          }
        }))
      }
    });
  }

}
