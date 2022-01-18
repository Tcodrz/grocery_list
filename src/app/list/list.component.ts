import * as ListsActions from './../state/lists/lists.actions';
import { List } from './../core/models/list.interface';
import { ModalGenericService } from './../shared/services/modal-generic.service';
import { Add, Remove } from './../state/items/items.actions';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { Item } from 'src/app/core/models/item.interface';
import { AppState } from '../state';

@Component({
  selector: 'gl-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  items: Item[];
  list: List;
  selectedItems: Item[] = [];
  iCurrentIndex: number;
  constructor(
    private store: Store<AppState>,
    private modal: ModalGenericService
  ) { }
  get bShowAdd(): boolean { return this.selectedItems.length < 1; }
  get bShowCheck(): boolean { return this.selectedItems.length > 0 && this.selectedItems.every(item => !item.bChecked); }
  get bShowTrash(): boolean { return this.selectedItems.length > 0 }
  get bShowUnCheck(): boolean { return this.selectedItems.length > 0 && this.selectedItems.every(item => item.bChecked); }
  ngOnInit(): void {
    this.init();
    this.modal.closed().subscribe(() => {
      this.init();
    });
  }
  private init(): void {
    this.store.select('listState').subscribe(listState => {
      this.list = listState.lists[listState.iCurrentList];
      if (!!this.list) this.items = this.list.items;
      this.iCurrentIndex = listState.iCurrentList;
    });
  }
  removeItems(): void {
    this.selectedItems.forEach(item => this.store.dispatch(ListsActions.RemoveItemsFromList({ payload: { listID: this.list._id, items: this.selectedItems } })));
    this.selectedItems = [];
  }
  onAddItem(): void {
    this.modal.open({
      sComponent: 'add-item',
      sTitle: 'הוספת פריט'
    });
  }
  onMarkChecked(): void {
    this.store.dispatch(ListsActions.MarkItemsChecked({ sListID: this.list._id, items: this.selectedItems }));
    this.selectedItems = [];
  }
  onItemsUnCheck(): void {
    // console.log(this.selectedItems);
    this.store.dispatch(ListsActions.ItemsUnCheck({ sListID: this.list._id, items: this.selectedItems }));
    this.selectedItems = [];
  }
}
