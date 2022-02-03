import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { Item } from 'src/app/core/models/item.interface';
import { AppState } from 'src/app/state';
import * as ListsActions from '../../state/lists/lists.actions';
import { List } from './../../core/models/list.interface';
import { ModalGenericService } from './../../shared/services/modal-generic.service';

enum ListActions {
  AddItem,
  DeleteItems,
  MarkChecked,
  MarkUnchecked,
  ItemEdit,
}

@Component({
  selector: 'gl-listbox',
  templateUrl: './listbox.component.html',
  styleUrls: ['./listbox.component.scss']
})
export class ListboxComponent implements OnInit {
  @Input() list: List;
  items: Item[] = [];
  aSelectedItems: Item[] = [];
  menuItems: MenuItem[];
  ListActions = ListActions;
  constructor(
    private modalService: ModalGenericService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.items = this.list.items;
    this.initMenu();
  }
  get bShowAdd(): boolean { return this.aSelectedItems.length < 1; }
  get bShowCheck(): boolean { return this.aSelectedItems.length > 0 && this.aSelectedItems.every(item => !item.bChecked); }
  get bShowTrash(): boolean { return this.aSelectedItems.length > 0 }
  get bShowUnCheck(): boolean { return this.aSelectedItems.length > 0 && this.aSelectedItems.every(item => item.bChecked); }
  get bShowItemEdit(): boolean { return this.aSelectedItems.length === 1; }

  onListAction(action: ListActions) {
    const bChecked = action === ListActions.MarkChecked;
    let items: Item[] = [];
    switch (action) {
      case ListActions.AddItem:
        this.onAddItem();
        break;
      case ListActions.DeleteItems:
        items = this.list.items.filter(item => !this.aSelectedItems.includes(item));
        break;
      case ListActions.MarkChecked:
      case ListActions.MarkUnchecked:
        items = this.list.items.map(item => {
          if (this.aSelectedItems.includes(item)) return { ...item, bChecked: bChecked };
          else return item;
        });
        break;
      case ListActions.ItemEdit:
        this.onItemEdit();
        break;
      default: debugger;
    }
    if (items.length > 0) {
      const list: List = { ...this.list, items };
      this.store.dispatch(ListsActions.Update({ payload: list }));
    }
  }
  onAddItem(): void {
    this.modalService.open({
      sComponent: 'add-item',
      sTitle: 'הוספת פריט',
      cb: (item: Item) => {
        item.sListID = this.list.id;
        this.store.dispatch(ListsActions.AddItemToList({ payload: { list: this.list, item } }));
      }
    });
  }
  onItemEdit(): void {
    this.modalService.open({
      sComponent: 'item-edit',
      sTitle: this.aSelectedItems[0].sName,
      cb: (item: Item) => {
        const items = this.list.items.map(i => i.id === item.id ? item : i);
        const list = { ...this.list, items };
        this.store.dispatch(ListsActions.Update({ payload: list }));
      },
      inputs: { item: this.aSelectedItems[0] }
    });
  }
  private initMenu(): void {
    this.menuItems = [
      {
        label: 'שיתוף רשימה',
        icon: 'pi pi-envelope',
        command: () => { this.onShareList(); }
      },
      {
        label: 'מחיקת רשימה',
        icon: 'pi pi-trash',
        command: () => { this.onDeleteList() }
      }
    ];
  }
  private onDeleteList(): void {
    const sEmptyListMsg = `למחוק את רשימת ${this.list.sName} ?`;
    const sNonEmptyListMsg = `רשימת ${this.list.sName} אינה ריקה, למחוק?`;
    this.modalService.open({
      sComponent: 'confirm',
      sTitle: 'אישור מחיקה',
      sMessage: this.items.length > 0 ? sNonEmptyListMsg : sEmptyListMsg,
      sIcon: 'pi pi-exclamation-triangle',
      cb: (confirm: boolean) => {
        if (confirm) { this.store.dispatch(ListsActions.DeleteList({ payload: this.list })); }
      }
    });
  }
  private onShareList(): void {
    navigator.share({
      url: `list-invite/${this.list.id}`,
      title: 'test',
      text: 'please click the link'
    }).then((res) => console.log('user invited')).catch(error => console.log(error));
  }
}
