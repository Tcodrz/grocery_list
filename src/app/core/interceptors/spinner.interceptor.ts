import { loaded, loading } from './../../state/index';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AppState } from 'src/app/state';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  constructor(
    private store: Store<AppState>,
  ) { }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.store.dispatch(loading());
    return next.handle(request).pipe(tap((res) => {
      if (res instanceof HttpResponse) this.store.dispatch(loaded());
    }));
  }
}
