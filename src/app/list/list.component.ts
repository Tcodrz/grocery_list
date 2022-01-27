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
      sComponent: 'add-list', sTitle: 'הוספת רשימה',
      cb: (listName: string) => {
        this.store.dispatch(ListsActions.Add({
          payload: {
            list: {
              sName: listName,
              items: [],
            },
            sUserID: this.user._id
          }
        }))
      }
    });
  }

}
