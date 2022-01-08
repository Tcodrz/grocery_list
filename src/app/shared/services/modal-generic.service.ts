import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Modal {
  open: boolean;
  params: ModalParams
}
export type ModalParams = {
  sComponent?: string;
  sTitle?: string;
};

@Injectable({
  providedIn: 'root'
})
export class ModalGenericService {
  private _modal$: BehaviorSubject<Modal> = new BehaviorSubject<Modal>({open: false, params: {}});
  constructor() { }
  get modal(): Observable<Modal> {
    return this._modal$.asObservable();
  }
  open(params: Partial<ModalParams>): void {
    const p: Modal = { open: true, params: params };
    this._modal$.next(p);
  }
  afterClose(): void {
    this._modal$.next({
      open: false,
      params: {}
    });
  }
}
