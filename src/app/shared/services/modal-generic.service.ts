import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

export interface Modal {
  open: boolean;
  params: ModalParams
}
export type ModalParams = {
  sComponent?: string;
  sTitle?: string;
  sMessage?: string;
  sIcon?: string;
  cb?: Function;

};

@Injectable({
  providedIn: 'root'
})
export class ModalGenericService {
  private _modal$: BehaviorSubject<Modal> = new BehaviorSubject<Modal>({ open: false, params: {} });
  private close$: Subject<void> = new Subject();
  constructor() { }
  get modal(): Observable<Modal> {
    return this._modal$.asObservable();
  }
  open(params: Partial<ModalParams>): void {
    const p: Modal = { open: true, params: params };
    this._modal$.next(p);
  }
  closed(): Observable<void> {
    return this.close$.asObservable();
  }
  afterClose(): void {
    this._modal$.next({
      open: false,
      params: {}
    });
    this.close$.next();
  }
}
