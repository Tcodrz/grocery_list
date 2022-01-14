import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { map, Observable } from 'rxjs';
import { AppState } from 'src/app/state';
import { setCurrentList } from './../../../state/lists/lists.actions';
import { ListsState } from './../../../state/lists/lists.reducer';
import { ModalGenericService } from './../../services/modal-generic.service';

@Component({
  selector: 'gl-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {
  items$: Observable<MenuItem[]>;
  state: ListsState;

  constructor(
    private store: Store<AppState>,
    private modalService: ModalGenericService
  ) { }

  ngOnInit(): void {
    this.items$ = this.prepareItems();
    this.store.select('listState').subscribe(state => this.state = state);
  }

  private prepareItems(): Observable<MenuItem[]> {
    return this.store.select('listState').pipe(
      map(listState => {
        return [
          {
            label: 'רשימה חדשה',
            icon: 'pi pi-plus',
            command: () => { this.onAddList() }
          },
          {
            label: 'רשימות',
            icon: 'pi pi-list',
            items: listState.lists.map(list => ({
              label: list.sName,
              command: (event) => this.goToList(event.item)
            }))
          },
        ]
      })
    );
  }

  private goToList(item: MenuItem): void {
    const iNextIndex = this.state.lists.findIndex(list => list.sName === item.label);
    this.store.dispatch(setCurrentList({ payload: iNextIndex }));
  }
  private onAddList(): void {
    this.modalService.open({
      sComponent: 'add-list',
      sTitle: 'הוספת רשימה'
    });
  }
}
