import { Component, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalComponent } from './../../../core/models/modal-component';
import { Modal, ModalGenericService, ModalParams } from './../../services/modal-generic.service';

@Component({
  selector: 'gl-modal-generic',
  templateUrl: './modal-generic.component.html',
  styleUrls: ['./modal-generic.component.scss']
})
export class ModalGenericComponent implements OnInit {
  @ViewChild('modalContent', { read: ViewContainerRef }) modalContent: ViewContainerRef;
  modal$: Observable<Modal>;
  bShow: boolean = false;
  params: ModalParams;
  component: ComponentRef<ModalComponent>;
  constructor(
    private modalService: ModalGenericService,
  ) { }

  ngOnInit(): void {
    this.modalService.modal.subscribe((modal) => {
      if (!modal?.params?.component) return;
      this.params = modal.params;
      this.component = this.modalContent.createComponent(this.params.component);
      this.component.instance.params = modal.params;
      this.bShow = modal.open
    });
  }
  onHide() {
    this.component.destroy();
    this.modalService.afterClose();
  }
}
