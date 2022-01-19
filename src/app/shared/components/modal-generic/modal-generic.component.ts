import { Observable, tap } from 'rxjs';
import { Modal, ModalGenericService, ModalParams } from './../../services/modal-generic.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'gl-modal-generic',
  templateUrl: './modal-generic.component.html',
  styleUrls: ['./modal-generic.component.scss']
})
export class ModalGenericComponent implements OnInit {
  modal$: Observable<Modal>;
  bShow: boolean;
  constructor(private modalService: ModalGenericService) { }

  ngOnInit(): void {
    this.modal$ = this.modalService.modal.pipe(tap((modal) => this.bShow = modal.open));
  }
  onHide() {
    this.modalService.afterClose();
  }
}
