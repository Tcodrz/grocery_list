import { Store } from '@ngrx/store';
import { ModalGenericService } from './../../shared/services/modal-generic.service';
import { List } from './../../core/models/list.interface';
import { Item } from 'src/app/core/models/item.interface';
import { Component, Input, OnInit } from '@angular/core';
import * as ListsActions from '../../state/lists/lists.actions';
import { AppState } from 'src/app/state';

@Component({
  selector: 'gl-listbox',
  templateUrl: './listbox.component.html',
  styleUrls: ['./listbox.component.scss']
})
export class ListboxComponent implements OnInit {
  @Input() list: List;
  @Input() bActive: boolean;
  items: Item[] = [];
  aSelectedItems: Item[] = [];

  constructor(
    private modalService: ModalGenericService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.items = this.list.items;

  }
  get bShowAdd(): boolean { return this.aSelectedItems.length < 1; }
  get bShowCheck(): boolean { return this.aSelectedItems.length > 0 && this.aSelectedItems.every(item => !item.bChecked); }
  get bShowTrash(): boolean { return this.aSelectedItems.length > 0 }
  get bShowUnCheck(): boolean { return this.aSelectedItems.length > 0 && this.aSelectedItems.every(item => item.bChecked); }
  get bShowItemEdit(): boolean { return this.aSelectedItems.length === 1; }
  removeItems(): void {
    this.aSelectedItems.forEach(item => this.store.dispatch(ListsActions.RemoveItemsFromList({ payload: { listID: this.list._id, items: this.aSelectedItems } })));
    this.aSelectedItems = [];
  }
  onAddItem(): void {
    this.modalService.open({
      sComponent: 'add-item',
      sTitle: 'הוספת פריט',
      cb: (item: Item) => {
        item.sListID = this.list._id;
        this.store.dispatch(ListsActions.AddItemToList({ payload: { listID: this.list._id, item: item } }))
      }
    });
  }
  onMarkChecked(): void {
    this.store.dispatch(ListsActions.MarkItemsChecked({ sListID: this.list._id, items: this.aSelectedItems }));
    this.aSelectedItems = [];
  }
  onItemsUnCheck(): void {
    this.store.dispatch(ListsActions.ItemsUnCheck({ sListID: this.list._id, items: this.aSelectedItems }));
    this.aSelectedItems = [];
  }
  onItemEdit(): void {
    this.modalService.open({
      sComponent: 'item-edit',
      sTitle: this.aSelectedItems[0].sName,
      cb: (item: Item) => { this.store.dispatch(ListsActions.UpdateItem({ sListID: this.list._id, item: item })); },
      inputs: { item: this.aSelectedItems[0] }
    })
  }
}
