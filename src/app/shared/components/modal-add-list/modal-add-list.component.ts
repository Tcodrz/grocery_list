import { Subscription } from 'rxjs';
import { ListsState } from './../../../state/lists/lists.reducer';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { AppState } from 'src/app/state';
import * as ListsActions from 'src/app/state/lists/lists.actions';

@Component({
  selector: 'gl-modal-add-list',
  templateUrl: './modal-add-list.component.html',
  styleUrls: ['./modal-add-list.component.scss']
})
export class ModalAddListComponent implements OnInit, OnDestroy {
  @Output() close: EventEmitter<void> = new EventEmitter();
  form: FormGroup;
  state: AppState;
  subscription: Subscription;
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>
  ) { }
  ngOnInit(): void {
    this.form = this.fb.group({
      sName: ['', Validators.required]
    });
    this.subscription = this.store.subscribe(state => this.state = state);
  }
  ngOnDestroy(): void { this.subscription.unsubscribe(); }
  onSubmit(): void {
    this.store.dispatch(ListsActions.Add({
      payload: {
        list: {
          sName: this.form.value.sName,
          items: []
        },
        sUserID: this.state.userState.user._id
      }
    }));
    this.close.emit();
  }
}
