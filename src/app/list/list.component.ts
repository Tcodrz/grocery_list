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
  items: Observable<Item[]>;
  selectedItems: Item[] = [];
  constructor(
    private store: Store<AppState>,
    private modal: ModalGenericService
  ) { }
  ngOnInit(): void {
    this.store.dispatch(Add({ payload: { sID: '1', sName: 'חלב', iAmount: 1 }}));
    this.store.dispatch(Add({ payload: { sID: '2', sName: 'לחמניות', iAmount: 6 }}));
    this.store.dispatch(Add({ payload: { sID: '3', sName: 'ביצים', iAmount: 12 }}));
    this.items = this.store.select('list').pipe(map(list => list.items));
  }
  onSelect() {
    this.bShowTrash = this.selectedItems.length > 0;
  }
  removeItems() {
    this.selectedItems.forEach(item => this.store.dispatch(Remove({ payload: item })))
    this.selectedItems = [];
    this.bShowTrash = false;
  }
  onAddItem() {
    this.modal.open({
      sComponent: 'add-item',
      sTitle: 'הוספת פריט'
    });
  }

}
