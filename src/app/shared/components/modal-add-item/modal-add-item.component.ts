import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Item } from 'src/app/core/models/item.interface';
import { AppState } from './../../../state/index';
import * as ListsActions from './../../../state/lists/lists.actions';
import { ListsState } from './../../../state/lists/lists.reducer';

@Component({
  selector: 'gl-modal-add-item',
  templateUrl: './modal-add-item.component.html',
  styleUrls: ['./modal-add-item.component.scss']
})
export class ModalAddItemComponent implements OnInit {
  @Output() close: EventEmitter<void> = new EventEmitter();
  form: FormGroup;
  state: ListsState;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      sName: ['', Validators.required],
      iAmount: [null, [Validators.required, Validators.min(1)]]
    });
    this.store.select('listState').subscribe(state => this.state = state);
  }
  onSubmit(): void {
    const item: Item = {
      sName: this.form.value.sName,
      iAmount: this.form.value.iAmount,
      sListID: this.state.lists[this.state.iCurrentList]._id,
      bChecked: false,
    }
    this.store.dispatch(ListsActions.AddItemToList({ payload: { listID: this.state.lists[this.state.iCurrentList]._id, item: item } }));
    this.close.emit();
  }

}
