import { AppState } from 'src/app/state';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalParams } from './../../services/modal-generic.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'gl-modal-add-list',
  templateUrl: './modal-add-list.component.html',
  styleUrls: ['./modal-add-list.component.scss']
})
export class ModalAddListComponent implements OnInit {
  @Input() params: ModalParams;
  @Output() close: EventEmitter<void> = new EventEmitter();
  form: FormGroup;
  state: AppState;
  subscription: Subscription;
  constructor(
    private fb: FormBuilder,
  ) { }
  ngOnInit(): void {
    this.form = this.fb.group({
      sName: ['', Validators.required]
    });
  }
  onSubmit(): void {
    this.params.cb(this.form.value.sName);
    this.close.emit();
  }
}
