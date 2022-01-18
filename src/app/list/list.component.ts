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
  bShowTrash: boolean;
  items: Item[];
  list: List;
  selectedItems: Item[] = [];
  iCurrentIndex: number;
  constructor(
    private store: Store<AppState>,
    private modal: ModalGenericService
  ) { }
  ngOnInit(): void {
    this.init();
    this.modal.closed().subscribe(() => {
      this.init();
    })
  }
  private init(): void {
    this.store.select('listState').subscribe(listState => {
      this.list = listState.lists[listState.iCurrentList];
      this.items = this.list?.items;
      this.iCurrentIndex = listState.iCurrentList;
    });
  }
  onSelect(): void {
    this.bShowTrash = this.selectedItems.length > 0;
  }
  removeItems(): void {
    this.selectedItems.forEach(item => this.store.dispatch(ListsActions.RemoveItemsFromList({ payload: { listID: this.list._id, items: this.selectedItems } })))
  }
  onAddItem(): void {
    this.modal.open({
      sComponent: 'add-item',
      sTitle: 'הוספת פריט'
    });
  }

}
