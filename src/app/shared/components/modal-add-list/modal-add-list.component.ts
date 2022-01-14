import { ListsState } from './../../../state/lists/lists.reducer';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AppState } from 'src/app/state';
import * as ListsActions from 'src/app/state/lists/lists.actions';

@Component({
  selector: 'gl-modal-add-list',
  templateUrl: './modal-add-list.component.html',
  styleUrls: ['./modal-add-list.component.scss']
})
export class ModalAddListComponent implements OnInit {
  @Output() close: EventEmitter<void> = new EventEmitter();
  form: FormGroup;
  state: ListsState;
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>
  ) { }
  ngOnInit(): void {
    this.form = this.fb.group({
      sName: ['', Validators.required]
    });
    this.store.select('listState').subscribe(state => this.state = state);
  }
  onSubmit(): void {
    debugger;
    this.store.dispatch(ListsActions.Add({
      payload: {
        sName: this.form.value.sName,
        items: []
      }
    }));
    this.close.emit();
  }
}
