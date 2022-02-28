import { ModalComponent } from './../../core/models/modal-component';
import { Component, ComponentRef, Injectable, Type } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export interface Modal {
  open: boolean;
  params: ModalParams
}
export type ModalParams = {
  component: Type<ModalComponent>;
  sTitle?: string;
  sMessage?: string;
  sIcon?: string;
  cb?: (...args: any) => any;
  inputs?: any;
};

@Injectable({
  providedIn: 'root'
})
export class ModalGenericService {
  private _modal$: BehaviorSubject<Modal> = new BehaviorSubject<Modal>({ open: false, params: {} as ModalParams });
  private close$: Subject<void> = new Subject();
  constructor() { }
  get modal(): Observable<Modal> {
    return this._modal$.asObservable();
  }
  open(params: ModalParams): void {
    const p: Modal = { open: true, params: params };
    this._modal$.next(p);
  }
  closed(): Observable<void> {
    return this.close$.asObservable();
  }
  afterClose(): void {
    this._modal$.next({
      open: false,
      params: {} as ModalParams
    });
    this.close$.next();
  }
}
