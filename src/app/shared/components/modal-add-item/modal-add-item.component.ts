import { Add } from './../../../state/items/items.actions';
import { AppState } from './../../../state/index';
import { Store } from '@ngrx/store';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'gl-modal-add-item',
  templateUrl: './modal-add-item.component.html',
  styleUrls: ['./modal-add-item.component.scss']
})
export class ModalAddItemComponent implements OnInit {
  @Output() close: EventEmitter<void> = new EventEmitter();
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      sName: ['', Validators.required],
      iAmount: [null, [Validators.required, Validators.min(1)]]
    })
  }
  onSubmit(): void {
    this.store.dispatch(Add({ payload: this.form.value }));
    this.close.emit();
  }

}
