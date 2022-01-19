import { ModalParams } from './../../services/modal-generic.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'gl-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss']
})
export class ModalConfirmComponent implements OnInit {
  @Input() params: ModalParams;
  @Output() close: EventEmitter<void> = new EventEmitter();
  constructor() { }
  ngOnInit(): void {
  }
  onConfirm() {
    console.log(this.params);
    this.params.cb(true);
    this.close.emit();
  }
  onReject() {
    console.log(this.params);
    this.params.cb(false);
    this.close.emit();
  }
}
