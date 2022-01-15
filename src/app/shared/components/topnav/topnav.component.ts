import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { map, Observable } from 'rxjs';
import { AppState } from 'src/app/state';
import { setCurrentList } from './../../../state/lists/lists.actions';
import { ListsState } from './../../../state/lists/lists.reducer';
import { ModalGenericService } from './../../services/modal-generic.service';
import * as UsersActions from '../../../state/users/users.actions';
import { User } from 'src/app/core/models/user.interface';

@Component({
  selector: 'gl-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {
  items$: Observable<MenuItem[]>;
  state: ListsState;
  user: User;

  constructor(
    private store: Store<AppState>,
    private modalService: ModalGenericService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.items$ = this.prepareItems();
    this.store.select('listState').subscribe(state => this.state = state);
    this.store.select('userState').subscribe(userState => this.user = userState.user);
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
              command: (event) => this.goToList(list._id)
            }))
          },
          {
            label: `${this.user.sFirstName} ${this.user.sLastName}`,
            icon: 'pi pi-user',
            items: [
              {
                label: 'ניהול',
                icon: 'pi pi-home',
                command: () => this.gotoAdminPage()
              },
              {
                label: 'התנתקות',
                icon: 'pi pi-sign-out',
                command: () => this.logout()
              },
            ]
          }
        ]
      })
    );
  }

  private goToList(sListID: string): void {
    const iNextIndex = this.state.lists.findIndex(list => list._id === sListID);
    this.store.dispatch(setCurrentList({ payload: iNextIndex }));
  }
  private onAddList(): void {
    this.modalService.open({
      sComponent: 'add-list',
      sTitle: 'הוספת רשימה'
    });
  }
  private logout(): void { this.store.dispatch(UsersActions.Logout()); }
  private gotoAdminPage(): void { this.router.navigate(['/admin/profile']) }
}
