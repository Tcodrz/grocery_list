import { SortOptions } from 'src/app/core/models/sort-options.enum';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { map } from 'rxjs';
import { Item } from 'src/app/core/models/item.interface';
import { AppState } from 'src/app/state';
import * as ListsActions from '../../state/lists/lists.actions';
import { List } from './../../core/models/list.interface';
import { User } from './../../core/models/user.interface';
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
  user: User;
  items: Item[] = [];
  aSelectedItems: Item[] = [];
  menuItems: MenuItem[];
  sortItems: MenuItem[];
  ListActions = ListActions;
  constructor(
    private modalService: ModalGenericService,
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.store.select('userState').pipe(
      map(userState => userState.user))
      .subscribe(user => this.user = user);
    this.items = this.list.items;
    this.initMenu();
    this.initSortMenu();
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
        this.store.dispatch(ListsActions.ItemAdd({ payload: { list: this.list, item } }));
      }
    });
  }
  onItemEdit(): void {
    this.modalService.open({
      sComponent: 'item-edit',
      sTitle: this.aSelectedItems[0].sName,
      cb: (item: Item) => {
        const items = this.items.map(i => i.id === item.id ? item : i);
        const list = { ...this.list, items };
        this.store.dispatch(ListsActions.Update({ payload: list }));
      },
      inputs: { item: this.aSelectedItems[0] }
    });
  }
  private initMenu(): void {
    const bUserIsAdmin = this.list.sListAdminID === this.user.id;
    this.menuItems = [
      {
        label: 'עריכת רשימה',
        icon: 'pi pi-pencil',
        command: () => { this.onEditList() }
      },
      this.list.bIsPublic && !bUserIsAdmin ?
        {
          label: 'הפסקת מעקב',
          icon: 'pi pi-undo',
          command: () => { this.onRemoveUserFromList() }
        } : null,
      !this.list.bIsPublic ? {
        label: 'שיתוף רשימה',
        icon: 'pi pi-share-alt',
        command: () => { this.onShareList(); }
      } : null,
      bUserIsAdmin ? {
        label: 'מחיקת רשימה',
        icon: 'pi pi-trash',
        command: () => { this.onDeleteList() }
      } : null,
      this.list.items.length > 0 ? {
        label: 'ניקוי רשימה',
        icon: 'pi pi-times',
        command: () => { this.onClearList() }
      } : null,
    ];
    this.menuItems = this.menuItems.filter(item => !!item);
  }
  private initSortMenu() {
    this.sortItems = [
      {
        label: 'נוצר ראשון',
        icon: 'pi pi-sort-amount-up',
        command: () => { this.onSortItems(SortOptions.OldestFirst); }
      },
      {
        label: 'נוצר אחרון',
        icon: ' pi pi-sort-amount-down',
        command: () => { this.onSortItems(SortOptions.NewFirst); }
      },
      {
        label: 'פתוחים קודם',
        icon: 'pi pi-circle',
        command: () => { this.onSortItems(SortOptions.CheckedLast); }
      },
      {
        label: 'סגורים קודם',
        icon: 'pi pi-check-circle',
        command: () => { this.onSortItems(SortOptions.CheckedFirst); }
      }
    ]
  }
  private onRemoveUserFromList(): void {
    this.store.dispatch(ListsActions.RemoveUserFromList({ payload: { userID: this.user.id, list: this.list } }));
  }
  private onEditList() {
    this.modalService.open({
      sComponent: 'list-edit',
      sTitle: 'עריכת רשימה',
      inputs: { list: this.list, },
      cb: (list: List) => {
        this.store.dispatch(ListsActions.Update({ payload: list }));
      }
    })
  }
  private onClearList() {
    this.store.dispatch(ListsActions.ListClear({ payload: this.list }));
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
        if (confirm) { this.store.dispatch(ListsActions.ListDelete({ payload: this.list })); }
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
  onSortItems(option: SortOptions) {
    this.store.dispatch(ListsActions.SortItems({ payload: { listID: this.list.id, sortOption: option } }));
  }
}
