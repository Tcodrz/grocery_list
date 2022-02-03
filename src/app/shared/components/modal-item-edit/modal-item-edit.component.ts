import { Units } from './../../../core/pipes/unit-types.pipe';
import { VLPair } from './../../../core/models/types';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Item } from 'src/app/core/models/item.interface';
import { ModalParams } from './../../services/modal-generic.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'gl-modal-item-edit',
  templateUrl: './modal-item-edit.component.html',
  styleUrls: ['./modal-item-edit.component.scss']
})
export class ModalItemEditComponent implements OnInit {
  @Input() params: ModalParams;
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  item: Item;
  form: FormGroup;
  aUnits: VLPair[] = [
    { value: '', label: '' },
    { value: Units.Gram, label: 'גרם' },
    { value: Units.KiloGram, label: 'קילו' },
    { value: Units.Unit, label: 'יחידה' }
  ];
  selectedUnit: VLPair;
  constructor(
    private fb: FormBuilder,
  ) { }
  ngOnInit(): void {
    this.form = this.fb.group({
      sName: ['', null],
      iAmount: [null, null],
      sUnit: ['', null],
      sComment: ['', null]
    })
    this.item = this.params.inputs.item;
    this.form.patchValue(this.item);
    const sUnit = this.aUnits.find(u => u.value === this.item.sUnit)?.value;
    this.form.patchValue({ sUnit: sUnit });
  }
  onSubmit(): void {
    const item = { ...this.item, ...this.form.value };
    this.params.cb(item);
    this.close.emit();
  }
  onCancel(): void {
    this.close.emit();
  }

}
